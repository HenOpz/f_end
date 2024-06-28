<template>
  <div class="page-container">
    <div class="page-section">
      <div class="table-wrapper">
        <div class="filter-wrapper">
          <div class="filter">
            <span>From Year</span>
            <DxSelectBox
              :items="yearList"
              value-expr="year"
              display-expr="year"
              placeholder="Select From Year"
              v-model="year.fromYear"
            />
          </div>
          <div class="filter">
            <span>From Month</span>
            <DxSelectBox
              :items="monthList"
              value-expr="id"
              display-expr="month"
              placeholder="Select From Month"
              v-model="month.fromMonth"
            />
          </div>
          <div style="width: 1px; height: 100%; background-color: lightgrey;"></div>
          <div class="filter">
            <span>To Year</span>
            <DxSelectBox
              :items="yearList"
              value-expr="year"
              display-expr="year"
              placeholder="Select To Year"
              v-model="year.toYear"
            />
          </div>
          <div class="filter">
            <span>To Month</span>
            <DxSelectBox
              :items="monthList"
              value-expr="id"
              display-expr="month"
              placeholder="Select To Month"
              v-model="month.toMonth"
            />
          </div>
          <!-- <DxButton class="filter-button">Filter</DxButton> -->
          <button class="submit" @click="FETCH_FILTER_REPORT">Filter</button>
        </div>

        <div class="chart-container">
              <highcharts id="chart" :options="chartOptions"  />
        </div>

        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px;">INSPECTION CAMPAIGN</h4>
          <DxDataGrid 
              id="data-grid-list" 
              key-expr="id" 
              :data-source="filterReport.inspCampaigns"
              :selection="{ mode: 'single' }" 
              :hover-state-enabled="true" 
              :allow-column-reordering="true"
              :show-borders="true" 
              :show-row-lines="true" 
              :row-alternation-enabled="false"
              :word-wrap-enabled="true" 
              :column-auto-width="true"
              @init-new-row="SET_CURRENT_VIEW(1)"
              @selection-changed="INSP_CAMPAIGNS_CHANGED"
          >
              <!-- <DxEditing 
                  :allow-updating="false" 
                  :allow-deleting="false" 
                  :allow-adding="true" :use-icons="true"
                  mode="popup" 
              /> -->
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />
              <!-- <DxSelection mode="single" /> -->
              <DxSelection mode="multiple" />
              <!-- <DxColumn data-field="id" caption="Item" :width="70" alignment="center" /> -->
              <DxColumn 
                  data-field="inspection_program" 
                  caption="Inspection Program" 
              />
              <DxColumn 
                  data-field="start_date" 
                  caption="Start Date" 
                  alignment="center"
                  dataType="date" 
                  format="dd MMM yyyy" 
              />
              <DxColumn 
                  data-field="end_date" 
                  caption="End Date" 
                  alignment="center"
                  dataType="date" 
                  format="dd MMM yyyy" 
              />
              <DxColumn
                  data-field="person_in_charge" 
                  caption="PIC" 
                  alignment="center" 
              />
              <DxColumn 
                  data-field="Contractor" 
                  caption="Contractor" 
                  alignment="center" 
              />
              <DxColumn 
                  data-field="comments" 
                  caption="Comments" 
                  alignment="center" 
              />
              <DxColumn 
                  data-field="id_ic_status" 
                  caption="Status" 
                  alignment="center"
                  cellTemplate="block-cell-template" 
              />

              <template #attachment-cell-template="{ }">
                  <div class="column-template">
                      <span>FileName.ext</span>
                          <magnifyingGlassSvg />
                  </div>
              </template>

              <template #block-cell-template="{ data }">
                  <div class="block" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
              </template>

              <DxScrolling mode="standard" />
              <!-- <DxSearchPanel :visible="true" /> -->
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager 
                  :show-page-size-selector="true" 
                  :allowed-page-sizes="[5, 10, 25]"
                  :show-navigation-buttons="true" 
                  :show-info="false" 
                  info-text="Page {0} of {1} ({2} items)" 
              />
              <DxExport :enabled="false" />
          </DxDataGrid>
        </div>
        
        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px;">RECTIFICATION CAMPAIGN</h4>
          <DxDataGrid 
              id="data-grid-list" 
              key-expr="id" 
              :data-source="filterReport.anomalyRectification"
              :selection="{ mode: 'single' }" 
              :hover-state-enabled="true" 
              :allow-column-reordering="true"
              :show-borders="true" 
              :show-row-lines="true" 
              :row-alternation-enabled="false"
              :word-wrap-enabled="true" 
              :column-auto-width="true"
              @init-new-row="SET_CURRENT_VIEW(1)"
              @selection-changed="RECTIFICATION_CHANGED"
          >
          <DxFilterRow :visible="true" />
          <DxHeaderFilter :visible="true" />
          <DxSelection mode="multiple" />
          <DxColumn 
              data-field="rc_issue" 
              caption="Rectification Issue" 
              width="300" 
              alignment="left" 
          />
          <DxColumn 
              data-field="person_in_charge" 
              caption="PIC" 
              alignment="center"
          />
          <DxColumn 
              data-field="contactor" 
              caption="Contractor" 
              :width="120" 
              alignment="center" 
          />
          <DxColumn 
              data-field="target_completion" 
              caption="Target Completion" 
              alignment="center" 
              data-type="date"
              format="dd MMM yyyy"
          />
          <DxColumn 
              data-field="id_status_work_package" 
              caption="Work Package"
              alignment="center"
              cellTemplate="block-cell-template" 
          />
          <DxColumn 
              data-field="id_status_manpower" 
              caption="Manpower"
              alignment="center"
              cellTemplate="block-cell-template" 
          />
          <DxColumn 
              data-field="id_status_equipment" 
              caption="Equipment"
              alignment="center"
              cellTemplate="block-cell-template" 
          />
          <DxColumn 
              data-field="id_status_pob" 
              caption="POB"
              alignment="center"
              cellTemplate="block-cell-template" 
          />
          <DxColumn 
              data-field="id_status_execute" 
              caption="Execute"
              alignment="center"
              cellTemplate="block-cell-template" 
          />
          <DxColumn 
              data-field="comments" 
              caption="Comments" 
              :width="300" 
              alignment="left" 
          />
          <template #block-cell-template="{ data }">
              <div class="block" :style="{ backgroundColor: GET_STATUS_CELL_COLOR(data) }"></div>
          </template>

          <DxScrolling mode="standard" />
          <!-- <DxSearchPanel :visible="true" /> -->
          <DxPaging :page-size="10" :page-index="0" />
          <DxPager 
              :show-page-size-selector="true" 
              :allowed-page-sizes="[10, 20, 30]"
              :show-navigation-buttons="true" 
              :show-info="false" 
              info-text="Page {0} of {1} ({2} items)" />
          <DxExport :enabled="false" />
          </DxDataGrid>
        </div>

        <div style="margin-top: 30px;">
          <h4 style="margin-bottom: 10px;">HIGHLIGHT ACTIVITIES</h4>
          <DxDataGrid 
              id="data-grid-list" 
              key-expr="id" 
              :data-source="filterReport.highlightActivities"
              :selection="{ mode: 'single' }" 
              :hover-state-enabled="true" 
              :allow-column-reordering="true"
              :show-borders="true" 
              :show-row-lines="true" 
              :row-alternation-enabled="false"
              :word-wrap-enabled="true" 
              :column-auto-width="true"
              @init-new-row="SET_CURRENT_VIEW(1)"
              @selection-changed="HIGHLIGHT_CHANGED"
          >
              
              <DxFilterRow :visible="true" />
              <DxHeaderFilter :visible="true" />
              <DxSelection mode="multiple" />
              <DxColumn 
                  data-field="report_date" 
                  caption="Report Date" 
                  :width="100" 
                  alignment="center"
                  dataType="date" 
                  format="dd MMM yyyy" 
              />
              <DxColumn
                  data-field="id_platform" 
                  caption="Platform" 
                  :width="100" 
                  alignment="center" 
              >
                  <!-- <DxLookup :data-source="platform" display-expr="code_name" value-expr="id" /> -->
              </DxColumn>
              <DxColumn 
                  data-field="id_asset" 
                  caption="Asset Type" 
                  :width="100" 
                  alignment="center"
              >
                  <!-- <DxLookup :data-source="asset" display-expr="asset_type" value-expr="id" /> -->
              </DxColumn>
              <DxColumn
                  data-field="tag_number"
                  caption="Tag Number" 
                  :width="150" 
                  alignment="center"
              />
              <DxColumn 
                  data-field="contractor" 
                  caption="Contractor" 
                  :width="150" 
                  alignment="center" 
              />
              <DxColumn 
                  data-field="person_in_charge" 
                  caption="PIC" 
                  :width="150" 
                  alignment="center" 
              />
              <DxColumn 
                  data-field="activities" 
                  caption="Activites" 
                  :min-width="300" 
                  alignment="center" 
              />
              
              <DxScrolling mode="standard" />
              <!-- <DxSearchPanel :visible="true" /> -->
              <DxPaging :page-size="10" :page-index="0" />
              <DxPager 
                  :show-page-size-selector="true" 
                  :allowed-page-sizes="[10, 20, 30]"
                  :show-navigation-buttons="true" 
                  :show-info="false" 
                  info-text="Page {0} of {1} ({2} items)" />
              <DxExport :enabled="false" />
          </DxDataGrid>
        </div>

        <!-- <div class="filter-report">
          <h5>FILTER REPORT</h5>
          <div class="field">
            <DxCheckBox
              :value="true"
            />
            <span>CM WO Management</span>
          </div>
          <div class="field">
            <DxCheckBox
              :value="true"
            />
            <span>Inspection</span>
          </div>
          <div class="field">
            <DxCheckBox
              :value="true"
            />
            <span>Anomaly</span>
          </div>
          <div class="field">
            <DxCheckBox
              :value="true"
            />
            <span>Highlight Activities</span>
          </div>
        </div> -->

        <button class="filter-report-download" @click="generatePDF">
          <!-- <img src="/img/svg/pen-svg.svg" class="svg" /> -->
            GENERATE
        </button>
        <div id="pdfPreview" style="margin-top: 10px;"></div>
      </div>
    </div>
  </div>
</template> 

<script>
//API
import { axios, axiosFileMaker } from "/axios.js";
import moment from "moment";

//Components
//import VueTabsChrome from "vue-tabs-chrome";
// import downloadSvg from "@/components/svg/download-svg.vue"

//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
// import DxButton from "devextreme-vue/button";
// import { DxItem } from "devextreme-vue/form";
import DxSelectBox from 'devextreme-vue/select-box';
// import { DxCheckBox } from 'devextreme-vue/check-box';
import exportingInit from "highcharts/modules/exporting";
import offlineExporting from "highcharts/modules/offline-exporting";
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
exportingInit(Highcharts);
offlineExporting(Highcharts);
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';

import {
  DxDataGrid,
  // DxSearchPanel,
  DxPaging,
  DxPager,
  DxScrolling,
  DxColumn,
  DxExport,
  // DxToolbar,
  DxHeaderFilter,
  DxSelection,
  // DxEditing,
  DxFilterRow,
  // DxLookup,
  // DxRequiredRule,
  // DxFormItem,
  // DxForm
} from "devextreme-vue/data-grid";

//Structures

export default {
  name: "inspection-record",
  components: {
    DxDataGrid,
    // DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    // DxToolbar,
    DxHeaderFilter,
    DxSelection,
    // DxForm,
    // DxItem,
    // DxEditing,
    DxFilterRow,
    DxSelectBox,
    // DxCheckBox,
    // DxAddRowButton,
    // DxLookup,
    // DxRequiredRule,
    // DxFormItem
    // downloadSvg,
    // DxButton
    highcharts: Chart
  },
  created() {
    this.$store.commit("UPDATE_CURRENT_PAGENAME", {
      subpageName: "MONTHLY REPORT",
      subpageInnerName: null,
    });
    if (this.$store.state.status.server == true) {
      const years = []
      for (let index = 0; index < 11; index++) {
        years.push({ id: index, year: 2020 + index })
      }
      this.yearList = years;
      this.monthList = [
        {
          id: 1,
          month: 'January',
        },
        {
          id: 2,
          month: 'February',
        },
        {
          id: 3,
          month: 'March',
        },
        {
          id: 4,
          month: 'April',
        },
        {
          id: 5,
          month: 'May',
        },
        {
          id: 6,
          month: 'June',
        },
        {
          id: 7,
          month: 'July',
        },
        {
          id: 8,
          month: 'August',
        },
        {
          id: 9,
          month: 'September',
        },
        {
          id: 10,
          month: 'October',
        },
        {
          id: 11,
          month: 'November',
        },
        {
          id: 12,
          month: 'December',
        },
      ]
      // this.FETCH_FILTER_REPORT();
      // this.FETCH_INSPECTION_RECORD();
      // this.FETCH_RECTICATION_CAMPAIGN();
      // this.FETCH_HIGHLIGHT_RECORD();
      // this.FETCH_FILTER_REPORT();
      this.FETCH_FILE_MAKER_RECORD();
      this.FETCH_CM_WO_MANAGEMENT_CHART();
      pdfMake.vfs = {
          ...pdfFonts.pdfMake.vfs,
      }
    }
  },
  watch: {
    'year.fromYear': function () {
      if (this.year.toYear && this.year.fromYear) {
        if (this.year.fromYear > this.year.toYear) {
          this.$nextTick(() => {
            this.year.fromYear = this.year.toYear;
          });
        }
      }
    },
    'year.toYear': function () {
      if (this.year.toYear && this.year.fromYear) {
        if (this.year.toYear < this.year.fromYear) {
          this.$nextTick(() => {
            this.year.toYear = this.year.fromYear;
          });
        }
      }
    },
    'month.fromMonth': function () {
      if (this.month.toMonth && this.month.fromMonth) {
        if (this.month.fromMonth > this.month.toMonth) {
          this.$nextTick(() => {
            this.month.fromMonth = this.month.toMonth;
          });
        }
      }
    },
    'month.toMonth': function () {
      if (this.month.toMonth && this.month.fromMonth) {
        if (this.month.toMonth < this.month.fromMonth) {
          this.$nextTick(() => {
            this.month.toMonth = this.month.fromMonth;
          });
        }
      }
    },
  },
  data() {
    return {
      testList: null,
      filterReport: {
        cmManagement: {},
        inspCampaigns: {},
        anomalyRectification: {},
        highlightActivities: {},
      },
      filterReportSelection: {
        cmManagement: {},
        inspCampaigns: {},
        anomalyRectification: {},
        highlightActivities: {},
      },
      anomalyList: {},
      // filterReport: {},
      yearList: null,
      monthList: null,
      year: {
        fromYear: 0,
        toYear: 0,
      },
      month: {
        fromMonth: 0,
        toMonth: 0,
      },
      // inspectionCampaignList: {},
      status: [],
      // rectificationCampaign: {},
      // highlightActivitiesList: {},
      // inspRecordList: {},
      // campaigeList: {},
      dataGridAttributes: {
        class: "data-grid-style"
      },
      inspDateInputOptions: { placeholder: "Select date" },
      projectNoInputOptions: { placeholder: "Enter project no" },
      reportNoInputOptions: { placeholder: "Enter report no" },
      remarkInputOptions: { placeholder: "Enter remark" },
      chartData: {
          xAxis: [],
          total: [],
          opened: [],
          closed: [],
          linear: [],
      },
      chartOptions: {
          credits: {
              enabled: false
          },
          chart: {
              zoomType: 'xy'
          },
          title: {
              text: 'CM Completion Performance',
              align: 'center'
          },
          xAxis: {
              categories: [],
              title: {
                  enabled: true,
                  text: 'Date',
                  style: {
                      color: '#262261'
                  }
              },
              labels: {
                  style: {
                      color: '#262261',
                      fontSize: '10px'
                  }
              },
              crosshair: true
          },
          yAxis: [{ 
              min: 0,
              max: 50,
              labels: {
                  format: '{value}',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              title: {
                  enabled: false
              },
              opposite: true
          }, { 
              title: {
                  enabled: false
              },
              labels: {
                  format: '{value}',
                  style: {
                      color: Highcharts.getOptions().colors[1]
                  }
              },
              
          }],
          tooltip: {
              shared: true
          },
          plotOptions: {
              line: {
                  dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: true
              },
              column: {
              dataLabels: {
                      enabled: true
                  },
                  enableMouseTracking: true
              }
          },
          series: [
              {
                  name: 'CM WO due',
                  type: 'column',
                  yAxis: 1,
                  data: [],
                  color: '#0079FF',
              }, 
              {
                  name: 'CM Closed',
                  type: 'line',
                  data: [],
                  color: '#00DFA2'
              }, 
              {
                  name: 'Trend',
                  type: 'line',
                  yAxis: 1,
                  data: [],
                  color: '#2CD3E1'
              }
              // {
              //     name: 'Linear',
              //     type: 'line',
              //     data: this.GET_TREND_LINE([[0, 416], [1, 389], [2, 383], [3, 364]]),
              // }
          ]
      }
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
    EXPORT_DATA(e) {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet("Projects");
      exportDataGrid({
        worksheet: worksheet,
        component: e.component
      }).then(function() {
        workbook.xlsx.writeBuffer().then(function(buffer) {
          saveAs(
            new Blob([buffer], { type: "application/octet-stream" }),
            "inspection_record.xlsx"
          );
        });
      });
      e.cancel = true;
    },
    FETCH_FILTER_REPORT(){
      this.isLoading = true;
        axios({
            method: "get",
            url:
                "/ReportGenerate/get-filter-report-data-by-period?fromMonth="+ this.month.fromMonth +"&toMonth=" + this.month.toMonth + "&fromYear="+ this.year.fromYear +"&toYear=" + this.year.toYear,
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        .then(res => {
            console.log("filter report:");
            console.log(res);
            if (res.status == 200 && res.data) {
                this.filterReport.cmManagement = res.data['CM WO management'],
                this.filterReport.inspCampaigns = res.data['Inspection campaigns'];
                this.filterReport.anomalyRectification = res.data['Anomaly rectification plan'];
                this.filterReport.highlightActivities = res.data['Highlight activities'];
            } 
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.isLoading = false;
        });
    },
    FETCH_INSP_RECORD() {
      this.isLoading = true;
      var id_tag = this.$route.params.id_tag;
      axios({
        method: "get",
        url:
          "/PipingInspectionRecord/get-piping-ir-by-id-line?id_line=" + id_tag,
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
        }
      })
        .then(res => {
          console.log("insp record:");
          console.log(res);
          if (res.status == 200 && res.data) {
            console.log("success");
            this.inspRecordList = res.data;
            console.log(this.inspRecordList);
          }
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    SET_CURRENT_VIEW(view, data = null) {
        this.$store.commit("SET_SHOW_BACK_BUTTON", false);
        if (data !== null) this.$emit('currentView', view, data);
        else this.$emit('currentView', view);
    },
    GET_STATUS_CELL_COLOR(value) {
        if (value.rowType === "data" && value.column.dataField === "id_ic_status") {
            if(value.data.id_ic_status) {
              // console.log('test ',value.data.id_ic_status);
                const color = this.status.filter(item => {
                    return item.id === value.data.id_ic_status
                });
                console.log('color ',color);
                if (color.length === 0) {
                  return "#fff";
                }
                return color[0].color_code;
            } else {
                return '#fff';
            }
        }
    },
    FETCH_CM_WO_MANAGEMENT_CHART(){
        this.isLoading = true;
        axios({
            method: "get",
            url:
                "/CMWOManagement/get-cm-wo-management-for-chart",
            headers: {
                Authorization: "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        .then(res => {
            if (res.status == 200 && res.data) {
                this.cmwoChart = res.data;
                for (var i = 0; i < this.cmwoChart.length; i++) {
                    this.chartData.xAxis.push(moment(this.cmwoChart[i].record_month).format("MMM yyyy"));
                    this.chartData.total.push(this.cmwoChart[i].cm_total);
                    this.chartData.opened.push(this.cmwoChart[i].cm_opened);
                    this.chartData.closed.push(this.cmwoChart[i].cm_closed);
                    this.chartData.linear.push([i, this.cmwoChart[i].cm_total]);
                }
                console.warn(this.chartData);
                this.chartOptions.xAxis.categories = this.chartData.xAxis;
                this.chartOptions.series[0].data = this.chartData.total;
                this.chartOptions.series[1].data = this.chartData.closed;
                this.chartOptions.series[2].data = this.GET_TREND_LINE(this.chartData.linear);
            }
        })
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            this.isLoading = false;
        });
    },
    GET_TREND_LINE(data) {
        const n = data.length;

        let sumX = 0,
            sumY = 0,
            sumXY = 0,
            sumX2 = 0;

        for (let i = 0; i < n; i++) {
            const [x, y] = data[i];
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumX2 += x ** 2;
        }

        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);

        const intercept = (sumY - slope * sumX) / n;

        const trendline = []; 

        const minX = Math.min(...data.map(([x]) => x));
        const maxX = Math.max(...data.map(([x]) => x));

        trendline.push([minX, Math.round(minX * slope + intercept)]);
        trendline.push([maxX, Math.round(maxX * slope + intercept)]);

        return trendline;
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
        const fontFamilyRegex = /font-family\s*:\s*(['"]?)(.*?)\1\s*;/gi;
        return htmlString.replace(fontFamilyRegex, `font-family: ${newFontFamily};`);
    },
    headerTable() {
        return {
            widths: [85.5, '*', 40, 48],
            body: [
                [
                    { rowSpan: 3, image: 'logo', width: 60, height: 50, alignment: 'center', margin: [0, 0, 0, 0] },
                    { rowSpan: 3, text: 'HIGHLIGHT ACTIVITIES REPORT', style: 'headerTitle', alignment: 'center' , margin: [0, 20, 0, 0] },
                    { text: 'No:', style: 'cellLeft' },
                    { text: this.data_row ? this.data_row.id : '-', style: 'headerCellRight' }
                ],
                [
                    '',
                    '',
                    { text: 'From Date:', style: 'cellLeft' }, 
                    { text: this.data_row ? this.DATE_FORMAT(this.data_row.gpi_date) : '-', style: 'headerCellRight' } 
                ],
                [
                    '',
                    '',
                    { text: 'To Date:', style: 'cellLeft' }, 
                    { text: '-', style: 'headerCellRight' } 
                ],
            ]
        }
    },
    anomalyTable() {
        if (this.anomalyList.length === 0 ||
            this.anomalyList.length === undefined) return {};
        
        let tableBody = [
          [
              { text: 'Module:', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Inspection Status', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Anomaly Repair', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Note', border: [true, false, true, true], style: 'cellLeft' },
          ]
        ];
        for (let index = 0; index < this.anomalyList.length; index++) {
          const item = this.anomalyList[index];
          if (item)
            tableBody.push([
              { text: item.fieldData.module_name || '-', border: [true, false, true, true] },
              { text: item.fieldData.inspection_plan_status || '-', border: [true, false, true, true] },
              { text: '-', border: [true, false, true, true] },
              { text: item.fieldData.remark || '-', border: [true, false, true, true] },
            ])
        }
        return [
          {
              table: {
                  widths: '*',
                  body: 
                  [
                      [
                        { text: 'VERY HIGH RISK EQUIPMENT & VERY HIGH RISK ANOMALY STATUS', style: 'cellTitle', border: [true, false, true, true], }
                      ],
                      
                  ]
              },
          },
          {
            border: [true, false, true, true],
            table: {
              widths: [80, 65, 65, '*'],
              border: [true, false, true, true],
              body: tableBody
            },
        }
      ]
    },
    async cmManagementTable() {
        // if (this.filterReportSelection.cmManagement.length === 0 ||
        //     this.filterReportSelection.cmManagement.length === undefined) return {};
         {
          const chartElement = document.getElementById('chart');
          const canvas = await html2canvas(chartElement);
          const imgData = canvas.toDataURL('image/png');
          return [
              {
                  table: {
                      widths: '*',
                      body: 
                      [
                          [{ text: 'CM WO MANAGEMENT', style: 'cellTitle', border: [true, false, true, true], }],
                          
                      ]
                  },
              },
              {
                border: [true, false, true, true],
                table: {
                  widths: ['*'],
                  border: [true, false, true, true],
                  body: [
                      [
                        { image: imgData, width: 500, border: [true, false, true, true] }
                      ]
                  ]
                },
            }
          ]
        }
        
    },
    inspectionCampaignTable() {
        if (this.filterReportSelection.inspCampaigns.length === 0 ||
            this.filterReportSelection.inspCampaigns.length === undefined) return {};
        let tableBody = [
         [
              { text: 'Inspection Program', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Start Date', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'End Date', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'PIC', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Contractor', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Comments', border: [true, false, true, true], style: 'cellLeft' },
              { text: 'Status', border: [true, false, true, true], style: 'cellLeft' },
          ]
        ];
        for (let index = 0; index < this.filterReportSelection.inspCampaigns.length; index++) {
          const item = this.filterReportSelection.inspCampaigns[index];
          if (item)
            tableBody.push([
              { text: item.inspection_program || '-', border: [true, false, true, true] },
              { text: item.start_date || '-', border: [true, false, true, true] },
              { text: item.end_date || '-', border: [true, false, true, true] },
              { text: item.person_in_charge || '-', border: [true, false, true, true] },
              { text: item.contractor || '-', border: [true, false, true, true] },
              { text: item.comments || '-', border: [true, false, true, true] },
              { text: item.ic_status || '-', border: [true, false, true, true] },
            ])
        }
        return [
          {
              table: {
                  widths: '*',
                  body: 
                  [
                      [{ text: 'INSPECTION CAMPAIGN', style: 'cellTitle', border: [true, false, true, true], }],
                      
                  ]
              },
          },
          {
            border: [true, false, true, true],
            table: {
              widths: ['*', 50, 50, 50, 50, '*', 30],
              border: [true, false, true, true],
              body: tableBody
            },
        }
      ]
    },
    rectificationCampaignTable() {
      if (this.filterReportSelection.anomalyRectification.length === 0 ||
          this.filterReportSelection.anomalyRectification.length === undefined) return {};
      let tableBody = [
         [
            { text: 'Rectification Issue', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'PIC', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Contractor', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Target Completion', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Execute', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Comments', border: [true, false, true, true], style: 'cellLeft' },
          ]
        ];
        for (let index = 0; index < this.filterReportSelection.anomalyRectification.length; index++) {
          const item = this.filterReportSelection.anomalyRectification[index];
          if (item)
            tableBody.push([
              { text: item.rc_issue || '-', border: [true, false, true, true] },
              { text: item.person_in_charge || '-', border: [true, false, true, true] },
              { text: item.contactor || '-', border: [true, false, true, true] },
              { text: item.target_completion || '-', border: [true, false, true, true] },
              { text: item.id_status_execute || '-', border: [true, false, true, true] },
              { text: item.comments || '-', border: [true, false, true, true] },
            ])
        }
        return [
          {
              table: {
                  widths: '*',
                  body: 
                  [
                      [{ text: 'RECTIFICATION CAMPAIGN', style: 'cellTitle', border: [true, false, true, true], }],
                      
                  ]
              },
          },
          {
            border: [true, false, true, false],
            table: {
              widths: ['*', 50, 50, 80, 30, '*'],
              border: [true, false, true, true],
              body: tableBody
            },
        }
      ]
    },
    highlightActivitiesTable() {
        if (this.filterReportSelection.highlightActivities.length === 0 ||
            this.filterReportSelection.highlightActivities.length === undefined) return {};
        console.log('this.filterReportSelection.highlightActivities', this.filterReportSelection.highlightActivities);
        let tableBody = [
         [
            { text: 'Report Date', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Platform', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Asset Type', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Tag Number', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'Contractor', border: [true, false, true, true], style: 'cellLeft' },
            { text: 'PIC', border: [true, false, true, true], style: 'cellLeft' },
          ]
        ];
        let detailTableBody = [];
        for (let index = 0; index < this.filterReportSelection.highlightActivities.length; index++) {
          const item = this.filterReportSelection.highlightActivities[index];
          if (item) {
            console.log('details', this.HTML_TO_PDF_MAKE(this.replaceFontFamily(item.details, 'Roboto')));
            tableBody.push([
              { text: item.report_date || '-', border: [true, false, true, true] },
              { text: item.platform_code_name || '-', border: [true, false, true, true] },
              { text: item.asset_type || '-', border: [true, false, true, true] },
              { text: item.tag_number || '-', border: [true, false, true, true] },
              { text: item.contractor || '-', border: [true, false, true, true] },
              { text: item.person_in_charge || '-', border: [true, false, true, true] },
            ])
            if (item.details) {
              let details = this.HTML_TO_PDF_MAKE(this.replaceFontFamily(item.details, 'Roboto'));
              for (let index = 0; index < details.length; index++) {
                const detailsItem = details[index];
                detailTableBody.push([
                  detailsItem
                ])
              }
            }
          }
        }
        return [
          {
              table: {
                  widths: '*',
                  body: 
                  [
                      [{ text: 'HIGHLIGHT ACTIVITIES', style: 'cellTitle', border: [true, false, true, true], }],
                      
                  ]
              },
          },
          {
            border: [true, false, true, true],
            table: {
              widths: [50, '*', '*', '*', 50, 50],
              border: [true, false, true, true],
              body: tableBody
            },
          },
          {
            border: [true, false, true, true],
            table: {
              widths: ['*'],
              border: [true, false, true, true],
              body: detailTableBody
            },
          }
      ]
      // this.HTML_TO_PDF_MAKE(this.replaceFontFamily(this.data_row.details, 'Roboto'))
    },
    async generatePDF() {
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
              this.anomalyTable(),
              await this.cmManagementTable(),
              this.inspectionCampaignTable(),
              this.rectificationCampaignTable(),
              this.highlightActivitiesTable()
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
        const pdfDocGenerator = pdfMake.createPdf(docDefinition);

        pdfDocGenerator.getDataUrl((dataUrl) => {
            const embed = document.createElement('embed');
            embed.src = dataUrl;
            embed.type = 'application/pdf';
            embed.width = '100%';
            embed.height = '600px';

            const pdfPreview = document.getElementById('pdfPreview');
            const existingEmbed = pdfPreview.querySelector('embed'); 

            if (existingEmbed) {
                pdfPreview.replaceChild(embed, existingEmbed);
            } else {
                pdfPreview.appendChild(embed); 
            }
        });
    },
    HTML_TO_PDF_MAKE(html) {
        if (html === null) return '-';
        let pdfContent = htmlToPdfmake(html);
        console.log('pdfContent', pdfContent);
        return pdfContent;
    },
    INSP_CAMPAIGNS_CHANGED(e) {
      if (e.selectedRowsData.length > 0)
        this.filterReportSelection.inspCampaigns = e.selectedRowsData;
    },
    RECTIFICATION_CHANGED(e) {
      if (e.selectedRowsData.length > 0)
        this.filterReportSelection.anomalyRectification = e.selectedRowsData;
    },
    HIGHLIGHT_CHANGED(e) {
      if (e.selectedRowsData.length > 0)
        this.filterReportSelection.highlightActivities = e.selectedRowsData;
    },
    GENERATE_SESSION(action, data) {
            axiosFileMaker({
                method: "POST",
                url: "/CPOC_AIMS/sessions",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Basic dmlzaXRvcjpBaW1zMjAyMg=="
                },
                data: {}
            })
                .then(res => {
                    localStorage.setItem("cpoc_aims_token", JSON.stringify(res.data.response.token));
                    if (action == 'fetch_file') {
                        this.FETCH_FILE_MAKER_RECORD();
                    } else if (action == 'on_update') {
                        this.ON_UPDATE(data);
                    } else if (action == 'fetch_chart') {
                        this.FETCH_CHART();
                    }
                })
                .catch(error => {
                    console.log("api", error);
                })
        },
        FETCH_FILE_MAKER_RECORD() {
            axiosFileMaker({
                method: "GET",
                url: "/CPOC_AIMS/layouts/executive_summary_table/records?_limit=10",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("cpoc_aims_token")),
                },
            })
                .then(res => {
                    this.anomalyList = res.data.response.data;
                    console.log('executive_summary_table', this.anomalyList);
                })
                .catch(error => {
                    console.log("api", error);
                    this.GENERATE_SESSION('fetch_file', '');
                })
        },
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";
.filter-report {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 10px;
  width: 200px;
  border-radius: 10px;
  margin-top: 50px;
  -webkit-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
  -moz-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
  box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);

  h5 {
    margin: 0;
  }
  .field {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    width: 100%;

    span {
      font-size: 14px;
    }
  }
}
.filter-report-download {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: none;
  background-color: white;
  padding: 10px;
  width: 220px;
  border-radius: 10px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 800;
  transition: 0.2s;
  cursor: pointer;
  color: black;
  border: solid black 1px;

  &:hover {
    -webkit-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
    box-shadow: 0px 10px 28px -7px rgba(0,0,0,0.3);
  }

  .svg {
    width: 20px;
  }
}
.filter-report-download:hover {
  transform:translateY(-2px);
}
.filter-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 30px;
  height: 60px;
  
  span {
    font-size: 14px;
    font-weight: 600;
  }
}
.page-container {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 51px calc(100vh - 95px);
  transition: all 0.3s;
  overflow-y: hidden;
}

.page-section {
  padding: 20px;
  overflow-y: auto;
  grid-row: span 2;
}

.page-section:last-child {
  padding-bottom: 20px;
}

.table-wrapper {
    margin-bottom: 200px;
}
button {
    width: 120px;
    margin-top: 20px;
    padding: 10px 0;
    color: white;
    background-color: white;
    border: 0;
    border-radius: 5px;
    font-weight: 600;
    font-size: 12px;
    transition: 1s;
    cursor: pointer;
      i {
          font-size: 14px;
      }
}
.submit {
    background-color: #291F85;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px
}
.chart-container {
    margin-top: 50px;
    width: auto;
    display: flex;
    justify-content: center;
}

</style>