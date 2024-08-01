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
import htmlToPdfmake from 'html-to-pdfmake';

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
            subpageName: "GPI NUMBER: ",
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/Md/get-md-platform-list', 'platformList');
            GET_DATA(this, '/Md/get-md-asset-type-list', 'assetTypeList');
            GET_DATA(this, '/Md/get-md-gpi-main-component-list', 'mainComponentList');
            GET_DATA(this, '/Md/get-md-gpi-damage-mechanism-list', 'damageMechanismList');
            GET_DATA(this, '/Md/get-md-gpi-severity-list', 'severityList');
            GET_DATA(this, '/Md/get-md-gpi-repair-list', 'typeOfRepairList');
            this.FETCH_FAILURE_RECORD();
            // this.FETCH_LIBRARY();
            pdfMake.vfs = {
                ...pdfFonts.pdfMake.vfs,
            }
        }
    },
    data() {
        return {
            failureRecordList: {},
            pictureLogList: [],
            export_status: {
                active: false,
                cur: 0,
                max: 0,
            },
            library: [],
            platformList: [],
            assetTypeList: [],
            mainComponentList: [],
            damageMechanismList: [],
            severityList: [],
            typeOfRepairList: [],
            id_record: this.data_row.id,
            localURL: 'http://localhost:8081',
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
        FETCH_FAILURE_RECORD() {
            GET_DATA(this, `/HighlightActivities/${this.id_record}`, (data) => { 
                if (data) {
                    this.failureRecordList = data;
                    this.$nextTick(function () {
                        window.setTimeout(() => {
                            this.generatePDF();
                        },500);
                    })
                }
             });
        },
        FETCH_PICTURE_LOG() {
            GET_DATA(this, `/GpiFile/get-gpi-file-by-id?id=${this.data_row.id}`, (data) => {
                if (data) this.pictureLogList = data;
            });
        },
        FETCH_LIBRARY() {
            GET_DATA(this, `/FailureFile/get-failure-file-by-id?id=${this.id_record}`, 'library');
        },
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
        replaceFontFamily(htmlString, newFontFamily) {
            // Define regular expression pattern to match font-family property
            const fontFamilyRegex = /font-family\s*:\s*(['"]?)(.*?)\1\s*;/gi;
            
            // Replace font-family property with newFontFamily
            return htmlString.replace(fontFamilyRegex, `font-family: ${newFontFamily};`);
        },
        headerTable() {
            return {
                widths: [85.5, '*', 37.5, 48],
                body: [
                    [
                        { rowSpan: 4, image: 'logo', width: 60, height: 50, alignment: 'center', margin: [0, 0, 0, 0] },
                        { rowSpan: 4, text: 'HIGHLIGHT ACTIVITIES REPORT', style: 'headerTitle', alignment: 'center' , margin: [0, 20, 0, 0] },
                        { text: 'No:', style: 'cellLeft' },
                        { text: this.data_row ? this.data_row.id : '-', style: 'headerCellRight' }
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
                        { text: '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Originator:', style: 'cellLeft' }, 
                        { text: '-', style: 'headerCellRight' } 
                    ],

                ]
            }
        },
        subHeaderTable() {
            if (this.failureRecordList === undefined) return {};
            return {
                widths: ['*', '*', '*', '*'],
                border: [true, false, true, true],
                body: [
                    [
                        { text: 'Platform:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_PLATFORM(this.data_row.id_platform), border: [true, false, true, true] },
                        { text: 'Asset Type:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_ASSET_TYPE(this.data_row.id_asset), border: [true, false, true, true] },
                    ],
                    [
                        { text: 'Tag Number:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.tag_number ? this.data_row.tag_number : '-', border: [true, false, true, true] },
                        { text: 'Contractor:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.contractor ? this.data_row.contractor : '-' },
                    ],
                    [
                        { text: 'PIC:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.person_in_charge ? this.data_row.person_in_charge : '-', border: [true, false, true, true] },
                        { text: '', border: [true, false, true, true], style: 'cellLeft' },
                        { text: '-', border: [true, false, true, true] },
                    ],
                    [
                        { text: 'Activities:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.data_row.activities ? this.data_row.activities : '-', border: [true, false, true, true], colSpan: 3 },
                    ],
                ]
            }
        },
        async generatePDF() {
            // const pictureLogData = async () => {
            //     let grid = [];
            //     let pictureRow = [];
            //     let noteRow = [];

            //     for (const element of this.pictureLogList) {
            //         await this.convert(this.baseURL + element.file_path);

            //         pictureRow.push({ image: this.base64ImageUrl, width: 200, alignment: 'center', border: [true, false, true, true] });
            //         noteRow.push({ text: element.note ? element.note : '-', border: [true, false, true, true] });

            //         if (pictureRow?.length === 2) {
            //             grid.push(pictureRow);
            //             grid.push(noteRow);

            //             pictureRow = [];
            //             noteRow = [];
            //         }

            //         this.base64ImageUrl = '';
            //     }

            //     if (pictureRow?.length > 0) {
            //         pictureRow.push({ text: '', border: [true, false, true, true] });
            //         noteRow.push({ text: '-', border: [true, false, true, true] });

            //         grid.push(pictureRow);
            //         grid.push(noteRow);

            //         pictureRow = [];
            //         noteRow = [];
            //     }

            //     if (this.pictureLogList?.length === 0) {
            //         grid.push(
            //             [
            //                 { text: '-', border: [true, false, true, true] },
            //                 { text: '-', border: [true, false, true, true] },
            //             ]
            //         )
            //     }

            //     console.warn(grid);

            //     return grid;
            // }

            const docDefinition = {
                info: {
                    title: 'test'
                },
                // content: this.HTML_TO_PDF_MAKE(this.data_row.details),
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
                            widths: '*',
                            body: 
                            [
                                [{ text: 'Details', style: 'cellTitle', border: [true, false, true, true], }],
                                
                            ]
                        },
                    },
                    this.HTML_TO_PDF_MAKE(this.replaceFontFamily(this.data_row.details, 'Roboto'))
                
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
            // pdfMake.fonts = {
            //     Calibri: {
            //         normal: 'Calibri-Regular.ttf',
            //         bold: 'Aptos-Bold.ttf',
            //         italics: 'Calibri-Italic.ttf',
            //         bolditalics: 'Calibri-BoldItalic.ttf'
            //     },
            //     Aptos: {
            //         normal: 'Calibri-Regular.ttf',
            //         bold: 'Aptos-Bold.ttf',
            //         italics: 'Calibri-Italic.ttf',
            //         bolditalics: 'Calibri-BoldItalic.ttf'
            //     },
            //     Roboto: {
            //         normal: 'Calibri-Regular.ttf',
            //         bold: 'Aptos-Bold.ttf',
            //         italics: 'Calibri-Italic.ttf',
            //         bolditalics: 'Calibri-BoldItalic.ttf'
            //     }
            // };
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);

            // Convert the PDF to a data URL
            pdfDocGenerator.getDataUrl((dataUrl) => {
                // Create an embedded object with the data URL
                const embed = document.createElement('embed');
                embed.src = dataUrl;
                embed.type = 'application/pdf';
                embed.width = '100%';
                embed.height = '600px';

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
        GET_DAMAGE_MECHANISM(id) {
            if (this.damageMechanismList.length === 0 || id === null) return '-';
            const filterValue = this.damageMechanismList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code;
        },
        GET_SEVERITY(id) {
            if (this.severityList.length === 0 || id === null) return '-';
            const filterValue = this.severityList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code;
        },
        GET_TYPE_OF_REPAIR(id) {
            if (this.typeOfRepairList.length === 0 || id === null) return '-';
            const filterValue = this.typeOfRepairList.filter(val => val.id == id);
            if (filterValue.length === 0) return '-';
            return filterValue[0].code;
        },
        HTML_TO_PDF_MAKE(html) {
            if (html === null) return '-';
            let pdfContent = htmlToPdfmake(html);
            
            // let border = [true, true, true, true]
            // pdfContent[0].push({border: [true,true,true,true]});
            pdfContent[0].border = [true,true,true,true];
            pdfContent[0].borderColor = [ "windowtext", "windowtext", "windowtext", "windowtext"]
            // pdfContent[0]._layout.vLineWidth(i => {
            //     console.log('vLine', i)
            //     return (i === 1 || i === 3 || i === 5) ? 0 : 1;
            // })
            console.log(pdfContent);
            return pdfContent;
        }
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