<template>
    <div class="page-container">
        <div class="action-bar">
            <button class="back" @click="SET_CURRENT_VIEW(0)">
                <i class="fas fa-chevron-left"></i> BACK
            </button>
            <div class="wrapper">
                <button class="submit">APPROVE</button>
                <button class="delete">REJECT</button>
            </div>
        </div>
        <div class="page-section">
            <div class="table-wrapper"> 
                <div id="pdfPreview"></div>
                <RiskMatrix pdf style="position: absolute; left: -9999px; top: -9999px;" />
            </div>
        </div>
    </div>
</template>

<script>
import { axios, GET_DATA } from "/axios.js";
import moment from "moment";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import html2canvas from 'html2canvas';
import RiskMatrix from "./RiskMatrix.vue"

export default {
    name: "failure-report",
    props: {
        data_row: Object,
    },
    components: {
        RiskMatrix
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "FR NUMBER: " + this.data_row.fl_number,
            subpageInnerName: null,
        });
        if (this.$store.state.status.server == true) {
            this.FETCH_DISC();
            this.FETCH_IMPACT();
            this.FETCH_PLATFORM();
            this.FETCH_FAILURE_RECORD();
            this.FETCH_LIBRARY();
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
        }
    },
    data() {
        return {
            failureRecordList: {},
            shortTermRecordList: [],
            longTermRecordList: [],
            shortTermLength: 2,
            longTermLength: 2,
            export_status: {
                active: false,
                cur: 0,
                max: 0,
            },
            library: [],
            platform: [],
            disc: [],
            impact: [],
            id_record: this.data_row.id,
            base64ImageUrl: '',
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
            GET_DATA(this, `/FailureRecord/${this.id_record}`, (data) => {
                this.failureRecordList = data;
                this.FETCH_SHORT_TERM_RECORD();
                this.FETCH_LONG_TERM_RECORD();
                this.$nextTick(function () {
                    window.setTimeout(() => {
                        this.generatePDF();
                    },1500);
                })
            });
        },
        FETCH_SHORT_TERM_RECORD() {
            axios({
                method: "get",
                url:
                    "/FailureActionRecord/get-failure-action-record-short-term-by-id?id_failure=" + this.failureRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.shortTermRecordList = res.data;
                        this.shortTermLength = this.shortTermRecordList.length + 1;
                        console.log("shortTermRecordList", this.shortTermRecordList);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.data.message == 'NoActionRecorded') {
                        this.shortTermLength = 2;
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_LONG_TERM_RECORD() {
            this.isLoading = true;
            axios({
                method: "get",
                url:
                    "/FailureActionRecord/get-failure-action-record-long-term-by-id?id_failure=" + this.failureRecordList.id,
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
                .then(res => {
                    if (res.status == 200 && res.data) {
                        this.longTermRecordList = res.data;
                        this.longTermLength = this.longTermRecordList.length + 1;
                        console.log("longTermRecordList", this.longTermRecordList);
                    }
                })
                .catch(error => {
                    console.log(error);
                    if(error.response.data.message == 'NoActionRecorded') {
                        this.longTermLength = 2;
                    }
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
        FETCH_LIBRARY() {
            GET_DATA(this, `/FailureFile/get-failure-file-by-id?id=${this.id_record}`, 'library');
        },
        FETCH_PLATFORM() {
            GET_DATA(this, '/Md/get-md-platform-list', 'platform');
        },
        FETCH_DISC() {
            GET_DATA(this, '/Md/get-md-failure-discipline-list', 'disc');
        },
        FETCH_IMPACT() {
            GET_DATA(this, '/Md/get-md-failure-impact-list', 'impact');
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
        headerTable() {
            return {
                widths: [85.5, '*', 37.5, 48],
                body: [
                    [
                        { rowSpan: 4, image: 'logo', width: 60, height: 50, alignment: 'center', margin: [0, 0, 0, 0] },
                        { rowSpan: 4, text: 'FAILURE REPORT', style: 'headerTitle', alignment: 'center' , margin: [0, 20, 0, 0] },
                        { text: 'No:', style: 'cellLeft' },
                        { text: this.failureRecordList ? this.failureRecordList.fl_number : '-', style: 'headerCellRight' }
                    ],
                    [
                        '',
                        '',
                        { text: 'Date:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.DATE_FORMAT(this.failureRecordList.findings_date) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Discipline:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.GET_DISC(this.failureRecordList?.id_discipline) : '-', style: 'headerCellRight' } 
                    ],
                    [
                        '',
                        '',
                        { text: 'Originator:', style: 'cellLeft' }, 
                        { text: this.failureRecordList ? this.failureRecordList.created_by : '-', style: 'headerCellRight' } 
                    ],

                ]
            }
        },
        subHeaderTable() {
            if (this.failureRecordList === undefined) return {};
            return {
                widths: [60, '*', 60, '*', 60, '*'],
                border: [true, false, true, true],
                body: [
                    [
                        { text: 'Tag No:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.tag_no, border: [true, false, true, true] },
                        { text: 'Location:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_PLATFORM(this.failureRecordList?.id_platform), border: [true, false, true, true] },
                        { text: 'Failure Impact:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.GET_IMPACT(this.failureRecordList?.id_failure_impact), border: [true, false, true, true] }
                    ],
                    [
                        { text: 'Drawing No:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.drawing_no, border: [true, false, true, true] },
                        { text: 'Unit:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.unit, border: [true, false, true, true] },
                        { text: 'Equipment Type:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.equipment_type, border: [true, false, true, true] }
                    ],
                    [
                        { text: 'Findings Date:', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.DATE_FORMAT(this.failureRecordList?.findings_date), border: [true, false, true, true] },
                        { text: 'Risk Level', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.id_risk, border: [true, false, true, true] },
                        { text: 'RCFA Required', border: [true, false, true, true], style: 'cellLeft' },
                        { text: this.failureRecordList?.is_rcfa, border: [true, false, true, true] }
                    ],
                ]
            }
        },
        async generatePictures() {
            if (this.library.length === 0) return;

            let pictures = []
            for (const element of this.library) {
                await this.convert(this.baseURL + element.file_path);

                pictures.push(
                    [
                        {
                            style: 'header',
                            pageBreak: 'before',
                            table: this.headerTable()
                        },
                        {
                            border: [true, false, true, true],
                            table: this.subHeaderTable()
                        },
                        { 
                            image: this.base64ImageUrl, 
                            width: 515, 
                            alignment: 'center', 
                            border: [true, false, true, true] 
                        }
                    ]
                )

                this.base64ImageUrl = '';
            }
            
            return pictures;
        },
        async generatePDF() {
            const shortTermData = () => {
                let data = [
                    [
                        { rowSpan: this.shortTermLength, text: 'Short-Term', style: 'cellSubTitle', border: [true, false, true, true], margin: [0, this.shortTermLength * 4.5, 0, 0] },
                        { text: 'Action No', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Action Detail', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Discipline', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Due Date', style: 'cellSubTitle', border: [true, false, true, true] }
                    ]
                ];               

                this.shortTermRecordList.forEach(element => {
                    data.push([
                        '',
                        { text: element.fa_number, border: [true, false, true, true] },
                        { text: element.action_details, border: [true, false, true, true] },
                        { text: this.GET_DISC(element.id_discipline), border: [true, false, true, true], alignment: 'center' },
                        { text: this.DATE_FORMAT(element.action_date), border: [true, false, true, true], alignment: 'center' }
                    ])
                })

                if (this.shortTermRecordList.length === 0) {
                    data.push([
                        '',
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] }
                    ])
                }
                
                //console.warn(data);
                
                return data;
            }

            const longTermData = () => {
                let data = [
                    [
                        { rowSpan: this.longTermLength, text: 'Long-Term', style: 'cellSubTitle', border: [true, false, true, true], margin: [0, this.longTermLength * 4.5, 0, 0] },
                        { text: 'Action No', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Action Detail', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Discipline', style: 'cellSubTitle', border: [true, false, true, true] },
                        { text: 'Due Date', style: 'cellSubTitle', border: [true, false, true, true] }
                    ]
                ];

                this.longTermRecordList.forEach(element => {
                    data.push([
                        '',
                        { text: element.fa_number, border: [true, false, true, true] },
                        { text: element.action_details, border: [true, false, true, true] },
                        { text: this.GET_DISC(element.id_discipline), border: [true, false, true, true], alignment: 'center' },
                        { text: this.DATE_FORMAT(element.action_date), border: [true, false, true, true], alignment: 'center' }
                    ])
                })

                if (this.longTermRecordList.length === 0) {
                    data.push([
                        '',
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] },
                        { text: '-', border: [true, false, true, true] }
                    ])
                }

                //console.warn(data);

                return data;
            }

            const riskMatrix = document.getElementById('risk-matrix');
            const canvas = await html2canvas(riskMatrix);
            const imgData = canvas.toDataURL('image/png');
            console.log(imgData);

            const docDefinition = {
                info: {
                    title: 'test'
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
                            widths: '*',
                            body: [[{ text: 'FAILURE DESCRIPTION', style: 'cellTitle', border: [true, false, true, true], }]]
                        },
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Details:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.details,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Findings:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.findings,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: [85.5, '*'],
                            body: [[
                                { text: 'Mitigation:', style: 'cellLeft', border: [true, false, true, true] },
                                {
                                    text: this.failureRecordList.mitigation,
                                    border: [true, false, true, true]
                                }
                            ]]
                        },
                        layout: {
                            vLineWidth: function (i) {
                                return (i === 1) ? 0 : 1;
                            },
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'FAILURE RISK', style: 'cellTitle', border: [true, false, true, true], }]]
                        },
                    },
                    {
                        table: {
                            widths: [85.5, 85.5, '*'],
                            body: [
                                [
                                    { text: 'Probability of Failure:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.failureRecordList.id_pof, border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_pof, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-People:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.failureRecordList.id_cof_people, border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_people, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Environment:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.failureRecordList.id_cof_environment, border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_environment, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Production Loss:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.failureRecordList.id_cof_production_loss, border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_production_loss, border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'COF-Reputation:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: this.failureRecordList.id_cof_reputation, border: [true, false, true, true] },
                                    { text: this.failureRecordList.note_cof_reputation, border: [true, false, true, true] }
                                ]
                            ]
                        }
                    },
                    {
                        table: {
                            widths: ['*'],
                            border: [true, false, true, true],
                            body: [
                                [
                                    // { image: imgData || 'logo', width: 500, border: [true, false, true, true] }
                                    { text: 'Risk Matrix', width: 500, border: [true, false, true, true] }
                                ]
                            ]
                        },
                    },
                    {
                        table: {
                            widths: '*',
                            body: [[{ text: 'REMEDIAL ACTION', style: 'cellTitle', border: [true, false, true, true], }]]
                        }
                    },
                    {
                        table: {
                            widths: [50, 68, '*', 50, 50],
                            body: shortTermData()
                        }
                    },
                    {
                        table: {
                            widths: [50, 68, '*', 50, 50],
                            body: longTermData()
                        }
                    },
                    {
                        table: {
                            widths: '*',
                            body: [
                                [{ text: 'REMARK', style: 'cellTitle', border: [true, false, true, true] }],
                                [{ text: this.failureRecordList.remark ? this.failureRecordList.material_cost : '-', border: [true, false, true, true] }]
                            ]
                        }
                    },
                    {
                        table: {
                            widths: ['*', '*', '*'],
                            body: [
                                [
                                    { text: 'ACKNOWLEDGMENT', style: 'cellTitle', border: [true, false, true, true], colSpan: 3 },
                                    '',
                                    ''
                                ],
                                [
                                    { text: 'Team Leader', border: [true, false, true, true], bold: true, alignment: 'center' },
                                    { text: 'Maintenance/Operation Supervisor', border: [true, false, true, true], bold: true, alignment: 'center' },
                                    { text: 'OIM', border: [true, false, true, true], bold: true, alignment: 'center' }
                                ],
                                [
                                    { text: '-', border: [true, false, true, false] },
                                    { text: '-', border: [true, false, true, false] },
                                    { text: '-', border: [true, false, true, false] }
                                ],
                                [
                                    { text: 'Name:', border: [true, false, true, true] },
                                    { text: 'Name:', border: [true, false, true, true] },
                                    { text: 'Name:', border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'Date:', border: [true, false, true, true] },
                                    { text: 'Date:', border: [true, false, true, true] },
                                    { text: 'Date:', border: [true, false, true, true] }
                                ],
                                [
                                    { text: 'CMMS Input by:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: 'Date:', style: 'cellLeft', border: [true, false, true, true] },
                                    { text: '', style: 'cellLeft', border: [true, false, true, true] }
                                ]
                            ]
                        },
                    },
                    await this.generatePictures(),
                ],
                pageBreakBefore: function(currentNode) {
                    
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

                // Append the embedded object to the preview container
                document.getElementById('pdfPreview').appendChild(embed);
            });
        },
        GET_PLATFORM(id) {
            const platform = this.platform.filter(p => p.id == id);
            return platform[0].code_name;
        },
        GET_IMPACT(id) {
            const impact = this.impact.filter(i => i.id == id);
            return impact[0].status;
        },
        GET_DISC(id) {
            const disc = this.disc.filter(d => d.id == id);
            return disc[0]?.discipline ? disc[0].discipline : '-';
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