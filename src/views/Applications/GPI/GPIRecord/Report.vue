<template>
    <div>
        <div class="page-container">
            <div class="action-bar">
                <button class="back" @click="SET_CURRENT_VIEW(0)">
                    <i class="fas fa-chevron-left"></i> BACK
                </button>
                <div class="wrapper">
                    <button class="submit" @click="isShow = 1">APPROVE</button>
                    <button class="delete">REJECT</button>
                </div>
            </div>
            <div class="page-section">
                <div class="table-wrapper"> 
                    <div id="pdfPreview"></div>
                </div>
            </div>
        </div>
        <Sap :sapData="data_row.id" v-if="isShow == 1" @popup="isShow = 0" />
    </div>
</template>

<script>
import { GET_DATA } from "/axios.js";
import moment from "moment";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import Sap from "./Sap.vue"

export default {
    name: "gpi-report",
    props: {
        data_row: Object,
    },
    components: {
        Sap
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "GPI NUMBER: " + this.data_row.gpi_number,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
            GET_DATA(this, '/Md/get-md-asset-type-list', 'assetTypeList');
            GET_DATA(this, '/Md/get-md-gpi-main-component-list', 'mainComponentList');
            GET_DATA(this, '/Md/get-md-gpi-damage-mechanism-list', 'damageMechanismList');
            GET_DATA(this, '/Md/get-md-gpi-severity-list', 'severityList');
            GET_DATA(this, '/Md/get-md-gpi-repair-list', 'typeOfRepairList');
            GET_DATA(this, '/Md/get-md-gpi-discipline-list', 'discList');
            GET_DATA(this, '/User/get-active-user-list', 'userList');
            GET_DATA(this, `/GpiRecord/${this.id_record}`, null, 
                (data) => {
                    this.gpiRecordList = data;
                    GET_DATA(this, `/GpiFile/get-gpi-file-by-id?id=${this.data_row.id}`, 'pictureLogList');
                    this.$nextTick(function () {
                        window.setTimeout(() => {
                            this.generatePDF();
                        }, 500);
                    })
                }
            )
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
    },
    data() {
        return {
            gpiRecordList: {},
            pictureLogList: [],
            export_status: {
                active: false,
                cur: 0,
                max: 0,
            },
            userList: [],
            library: [],
            platformList: [],
            assetTypeList: [],
            mainComponentList: [],
            damageMechanismList: [],
            severityList: [],
            typeOfRepairList: [],
            discList: [],
            id_record: this.data_row.id,
            base64ImageUrl: '',
            isShow: 0
        };
    },
    computed: {
        baseURL() {
            var mode = this.$store.state.mode;
            if (mode == "dev") return this.$store.state.modeURL.dev;
            else if (mode == "prod") return this.$store.state.modeURL.prod;
            else return console.log("develpment mode set up incorrect.");
        }
    },
    methods: {
        DATE_FORMAT(d) {
            return moment(d).format("DD MMM yyyy");
        },
        SET_CURRENT_VIEW(view, data = null) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            if (data !== null) this.$emit('currentView', view, data);
            else this.$emit('currentView', view);
        },
        convertImageToBase64(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = 'Anonymous';

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    const dataURL = canvas.toDataURL('image/png');
                    resolve(dataURL);
                };

                img.onerror = (e) => {
                    reject(e);
                };

                img.src = url;
            });
        },
        async convert(url) {
            try {
                this.error = null;
                this.base64ImageUrl = await this.convertImageToBase64(url);
            } catch (e) {
                this.error = e;
                console.error('Failed to convert image:', e);
            }
        },
        headerTable() {
            return {
                widths: [137.5, '*', 37.5, 100],
                body: [
                    [
                        { rowSpan: 4, image: 'logo', width: 60, height: 50, alignment: 'center', margin: [0, 0, 0, 0] },
                        { rowSpan: 4, text: 'GPI REPORT', style: 'headerTitle', alignment: 'center' , margin: [0, 20, 0, 0] },
                        { text: 'No:', style: 'cellLeft' },
                        { text: this.gpiRecordList.gpi_number ? this.gpiRecordList.gpi_number : '-', style: 'headerCellRight' }
                    ],
                    [
                        '',
                        '',
                        { text: 'Date:', style: 'cellLeft' }, 
                        { text: this.data_row ? this.DATE_FORMAT(this.data_row.gpi_date) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Discipline:', style: 'cellLeft' }, 
                        { text: this.gpiRecordList.id_discipline ? this.GET_DISC(this.gpiRecordList.id_discipline) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Originator:', style: 'cellLeft' }, 
                        { text: this.gpiRecordList.created_by ? this.GET_USER(this.gpiRecordList.created_by) : '-', style: 'headerCellRight' } 
                    ],

                ]
            }
        },
        subHeaderTable() {
            if (this.gpiRecordList === undefined) return {};
            return {
                widths: ['*', '*', '*', '*'],
                border: [true, false, true, true],
                body: [
                    [
                        { text: 'Platform:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_PLATFORM(this.data_row.id_platform), border: [true, false, true, true] },
                        { text: 'Asset Type:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.asset_type, border: [true, false, true, true] },
                    ],
                    [
                        { text: 'Tag Number:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.tag_no ? this.data_row.tag_no : '-', border: [true, false, true, true] },
                        { text: 'Location | Deck:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.location_deck ? this.data_row.location_deck : '-' },
                    ],
                    [
                        { text: 'Main Component:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.main_component_free_text ? this.data_row.main_component_free_text : "-", border: [true, false, true, true] },
                        { text: 'Severity:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_SEVERITY(this.data_row.id_severity), border: [true, false, true, true] },
                    ],
                    [
                        { text: 'Mitigation:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.mitigation_free_text ? this.data_row.mitigation_free_text : '-', border: [true, false, true, true] },
                        { text: 'Repair Description:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.repair_type_free_text ? this.data_row.repair_type_free_text : "-", border: [true, false, true, true] },
                    ],
                    [
                        { text: 'Expected Finish Date:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.expected_finish_date ? this.DATE_FORMAT(this.data_row.expected_finish_date) : '-', border: [true, false, true, true] },
                        { text: '', border: [true, false, true, true], style: 'cellLeft' },
                        { text: '', border: [true, false, true, true] },
                    ],
                ]
            }
        },
        async generatePDF() {
            const pictureLogData = async () => {
                let grid = [];
                let pictureRow = [];
                let noteRow = [];

                for (const element of this.pictureLogList) {
                    await this.convert(this.baseURL + element.file_path);

                    pictureRow.push({ image: this.base64ImageUrl, width: 200, alignment: 'center', border: [true, false, true, true] });
                    noteRow.push({ text: element.note ? element.note : '-', border: [true, false, true, true] });

                    if (pictureRow?.length === 2) {
                        grid.push(pictureRow);
                        grid.push(noteRow);

                        pictureRow = [];
                        noteRow = [];
                    }

                    this.base64ImageUrl = '';
                }

                if (pictureRow?.length > 0) {
                    pictureRow.push({ text: '', border: [true, false, true, true] });
                    noteRow.push({ text: '-', border: [true, false, true, true] });

                    grid.push(pictureRow);
                    grid.push(noteRow);

                    pictureRow = [];
                    noteRow = [];
                }

                if (this.pictureLogList?.length === 0) {
                    grid.push(
                        [
                            { text: '-', border: [true, false, true, true] },
                            { text: '-', border: [true, false, true, true] },
                        ]
                    )
                }

                console.warn(grid);

                return grid;
            }

            const docDefinition = {
                info: {
                    title: this.gpiRecordList.gpi_number ? this.gpiRecordList.gpi_number : '-'
                },
                content: [
                    {
                        style: 'header',
                        table: this.headerTable(),
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 3) ? 0 : 1;
                            },
                        }
                    },
                    {
                        border: [true, false, true, true],
                        table: this.subHeaderTable(),
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1 || i === 3 || i === 5) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: ['*', '*'],
                            border: [true, false, true, true], 
                            body: [
                                [
                                    { 
                                        text: 'Damage Mechanism / Findings', 
                                        style: 'cellTitle', 
                                        border: [true, false, true, true], 
                                    },
                                    { 
                                        text: 'Recommendation', 
                                        style: 'cellTitle', 
                                        border: [true, false, true, true], 
                                    },
                                ],
                                [
                                    {
                                        text: this.gpiRecordList.dmg_mech_findings,
                                        border: [true, false, true, true]
                                    },
                                    {
                                        text: this.gpiRecordList.recommendation,
                                        border: [true, false, true, true]
                                    }
                                ]
                            ]
                        },
                        // layout: {
                        //     vLineWidth: function (i) {
                        //         return (i === 1) ? 0 : 1;
                        //     },
                        // }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'Picture Log', style: 'cellTitle', border: [true, false, true, true], }]]
                        }
                    },
                    {
                        table: {
                            widths: ['*', '*'],
                            body: await pictureLogData()
                        }
                    },
                ],
                pageBreakBefore: function(currentNode) {
                    // console.log('currentNode', currentNode);
                    // console.log('followingNodesOnPage', followingNodesOnPage);
                    // console.log('nodesOnNextPage', nodesOnNextPage);
                    // console.log('previousNodesOnPage', previousNodesOnPage);
                    if(
                        (currentNode.startPosition.top > 800 && currentNode.text == 'REMEDIAL ACTION') || 
                        (currentNode.startPosition.top > 700 && currentNode.text == 'REMARK') ||
                        (currentNode.startPosition.top > 700 && currentNode.text == 'ACKNOWLEDGMENT')
                    ) {
                        console.warn(currentNode.text);
                        currentNode.startPosition.pageNumber = 2;
                        return true;
                    }
                    //return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
                },
                styles: {
                    header: {
                        // margin: [0, -30, 0, 0],
                    },
                    headerTitle: {
                        fontSize: 14,
                        bold: true
                    },
                    cellLeft: {
                        fillColor: '#d3d3d3',
                    },
                    cellRight: {},
                    cellTitle: {
                        fontSize: 10,
                        bold: true,
                        fillColor: '#d3d3d3',
                        alignment: 'center',
                    },
                    cellSubTitle: {
                        fontSize: 8,
                        fillColor: '#d3d3d3',
                        alignment: 'center',
                    }
                },
                defaultStyle: {
                    fontSize: 8,
                },
                images: {
                    logo: this.baseURL + 'wwwroot/assets/cpoc_logo_new.png'
                }
            };
            //pdfMake.createPdf(docDefinition).open();
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);

            // Convert the PDF to a data URL
            pdfDocGenerator.getDataUrl((dataUrl) => {

                // Split the data URL to get the base64 data
                const [metadata, base64Data] = dataUrl.split(',');

                // Decode the base64 string to a binary string
                const binaryString = atob(base64Data);

                // Create an array of bytes
                const byteArray = new Uint8Array(binaryString.length);
                for (let i = 0; i < binaryString.length; i++) {
                    byteArray[i] = binaryString.charCodeAt(i);
                }

                // Extract the mime type from the metadata
                const mimeType = metadata.split(':')[1].split(';')[0];
                const b = new Blob([byteArray], { type: mimeType });
                const c = URL.createObjectURL(b)
                console.log(c);
                
                const embed = document.createElement('embed');
                embed.src = c;
                embed.type = 'application/pdf';
                embed.width = '100%';
                embed.height = '600px';
                console.log(embed);

                // Append the embedded object to the preview container
                document.getElementById('pdfPreview').appendChild(embed);
            });
        },
        GET_PLATFORM(id) {
            if (this.platformList.length === 0 || id === null) return '-';
            const filterValue = this.platformList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code_name;
        },
        GET_ASSET_TYPE(id) {
            if (this.assetTypeList.length === 0 || id === null) return '-';
            const filterValue = this.assetTypeList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].asset_type;
        },
        GET_MAIN_COMPONENT(id) {
            if (this.mainComponentList.length === 0 || id === null) return '-';
            const filterValue = this.mainComponentList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code;
        },
        GET_SEVERITY(id) {
            if (this.severityList.length === 0 || id === null) return '-';
            const filterValue = this.severityList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].status;
        },
        GET_TYPE_OF_REPAIR(id) {
            if (this.typeOfRepairList.length === 0 || id === null) return '-';
            const filterValue = this.typeOfRepairList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code;
        },
        GET_DISC(id) {
            const disc = this.discList.filter(d => d.id == id);
            return disc[0]?.code ? disc[0].code : '-';
        },
        GET_USER(id) {
            const user = this.userList.filter(d => d.id == id);
            return user[0]?.name ? user[0].name : '-';
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.page-container {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 51px calc(100vh - 95px);
    transition: all 0.3s;
    // overflow-y: hidden;
}

.page-section {
    padding: 20px;
    overflow-y: auto;
    height: calc(100% - 270px);
    grid-row: span 2;
    margin-top: 60px;
}

.table-wrapper {
    display: grid;
    grid-template-columns: 100%;
    gap: 15px;
    margin-bottom: 20px !important;

    *[fill] {
        grid-column: span 2;
    }

    .input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 6px;

        span {
            font-size: 16px;
        }
    }

    button {
        padding: 20px 0;
        background-color: white;
        border: solid 1px gray;
        border-radius: 10px;
        font-weight: 800;
        font-size: 16px;
        transition: 1s;
        cursor: pointer;
    }

    .create {
        color: white;
        background-color: $web-theme-color-secondary;
    }
}



</style>