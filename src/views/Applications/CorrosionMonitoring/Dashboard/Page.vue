<template>
    <div>
        <div class="page-container">
            <div class="page-section">
                <div class="table-wrapper">
                    <div fill class="table-tabs-buttons">
                        <button 
                            v-for="(tab, index) in tabs" 
                            :key="index" 
                            :class="active_tab === tab ? 'active' : ''"
                            @click="active_tab = tab"
                        >
                            {{ tab }}
                        </button>
                    </div>
                </div>
                <div fill v-if="active_tab === tabs[0]" class="table-chart">
                    <div style="margin-top: 15px;">
                        <!-- <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
                            <label class="hd">Pipeline</label>
                        </div> -->
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Pipeline System</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="pipelineSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                        >
                            <DxColumn 
                                data-field="platform" 
                                caption="Platform" 
                                :width="100"
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="tag_no" 
                                caption="Tag No." 
                                :width="120"
                                alignment="left" 
                            />
                            <DxColumn caption="Integrity Status">
                                <DxColumn 
                                    data-field="id_pigging_operation" 
                                    caption="Splash Pig" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="poTemplate"
                                />
                                <!-- <DxColumn 
                                    data-field="id_water_analysis" 
                                    caption="Water Analysis" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="waTemplate"
                                /> -->
                                <DxColumn 
                                    data-field="id_micro_bacteria" 
                                    caption="Microbiological Bacteria" 
                                    :width="110"
                                    alignment="center" 
                                    cell-template="mbTemplate"
                                />
                                <DxColumn 
                                    data-field="id_corrosion_coupon" 
                                    caption="Corrosion Coupon" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="ccTemplate"
                                />
                                <DxColumn 
                                    data-field="id_er_probe" 
                                    caption="ER Probe" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="erTemplate"
                                />
                                <DxColumn 
                                    data-field="id_ci" 
                                    caption="Chemical Injection Result" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="ciTemplate"
                                />
                                <DxColumn 
                                    data-field="id_rci" 
                                    caption="R-CI" 
                                    :width="100"
                                    alignment="center" 
                                    cell-template="rciTemplate"
                                />
                            </DxColumn>
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="130"
                                alignment="left" 
                            />
                            <template #poTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_pigging_operation == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_pigging_operation == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_pigging_operation == 1"></button>
                                </div>
                            </template>
                            <template #waTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_water_analysis == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_water_analysis == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_water_analysis == 1"></button>
                                </div>
                            </template>
                            <template #mbTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_micro_bacteria == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_micro_bacteria == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_micro_bacteria == 1"></button>
                                </div>
                            </template>
                            <template #ccTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_corrosion_coupon == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_corrosion_coupon == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_corrosion_coupon == 1"></button>
                                </div>
                            </template>
                            <template #erTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_er_probe == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_er_probe == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_er_probe == 1"></button>
                                </div>
                            </template>
                            <template #ciTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_ci == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_ci == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_ci == 1"></button>
                                </div>
                            </template>
                            <template #rciTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_rci == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_rci == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_rci == 1"></button>
                                </div>
                            </template>
                            <!-- <DxMasterDetail
                                :enabled="true"
                                template="masterDetailTemplate"
                            />
                            <template #masterDetailTemplate="{ data }">
                                <div>
                                    Note: 
                                    <textarea :value="data.data.note" style="width: 100%; min-height: 100px; border: none; font-size: 10px; padding: 5px; margin-top: 5px;"></textarea>
                                </div>
                            </template> -->
                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <div class="definition" style="display: grid; grid-template-columns: 400px auto;">
                            <ul class="ul-detail-ii" style="grid-column: span 2; margin-block-end: -5px;">
                                <li class="li-header">Note:</li>
                            </ul>
                            <ul class="ul-detail-ii">
                                <li class="li-header">1. Water Analysis</li>
                                <ul class="ul-detail-ii">
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>Dissolved O2 &lt;= 30</span>
                                            <div class="circle yellow" /><span>Dissolved O2 = N/A</span>
                                            <div class="circle red" /><span>Dissolved O2 &gt; 30</span>
                                        </div>
                                    </li>
                                </ul>
                                <li class="li-header">2. Microbiological Bacteria</li>
                                <ul class="ul-detail-ii">
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>SRB &lt;= 0.3</span>
                                            <div class="circle yellow" /><span>0.3 &lt; SRB &lt;= 100</span>
                                            <div class="circle red" /><span>SRB &gt; 100</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>ATP &lt;= 10</span>
                                            <div class="circle yellow" /><span>10 &lt; ATP &lt;= 100</span>
                                            <div class="circle red" /><span>ATP &gt; 100</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>GHB &lt;= 0.3</span>
                                            <div class="circle yellow" /><span>0.3 &lt; GHB &lt;= 100</span>
                                            <div class="circle red" /><span>GHB &gt; 100</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>APGHB &lt;= 0.3</span>
                                            <div class="circle yellow" /><span>0.3 &lt; APGHB &lt;= 100</span>
                                            <div class="circle red" /><span>APGHB &gt; 100</span>
                                        </div>
                                    </li>
                                </ul>
                            </ul>
                            <ul class="ul-detail-ii">
                                <li class="li-header">3. Corrosion Coupon</li>
                                <ul class="ul-detail-ii">
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>Corrosion Rate &lt; 0.025</span>
                                            <div class="circle yellow" /><span>0.025 &lt;= Corrosion Rate &lt;= 0.25</span>
                                            <div class="circle red" /><span>Corrosion Rate &gt; 0.25</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>Max Pitting Rate &lt; 0.13</span>
                                            <div class="circle yellow" /><span>0.13 &lt;= Max Pitting Rate &lt;= 0.38</span>
                                            <div class="circle red" /><span>Max Pitting Rate &gt; 0.38</span>
                                        </div>
                                    </li>
                                </ul>
                                <li class="li-header">4. Chemical Injection</li>
                                <ul class="ul-detail-ii">
                                    <li>
                                        <div class="circle-row">
                                            <div class="circle green" /><span>Meet</span>
                                            <div class="circle red" /><span>Not Meet</span>
                                        </div>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <!-- <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
                            <label class="hd">Cooling Medium</label>
                        </div> -->
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Cooling Medium Circuit</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 

                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="id_integrity_status" 
                                caption="Integrity Status" 
                                :width="100"
                                alignment="center" 
                                cell-template="integrityTemplate"
                            >
                                <DxLookup :data-source="integrityList" display-expr="severity_level" value-expr="id" />
                            </DxColumn>
                            <template #integrityTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 1"></button>
                                </div>
                            </template>
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <div class="circle-wrapper">
                            <div class="circle-row" v-for="(status, index) in statusList" :key="index">
                                <div class="circle" :style="{ backgroundColor: GET_STATUS_COLOR(status) }" />
                                <span>{{ status }}</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 15px;">
                        <!-- <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
                            <label class="hd">Produce Water</label>
                        </div> -->
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Produce Water Circuit</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :selection="{ mode: 'single' }" 
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="id_integrity_status" 
                                caption="Integrity Status" 
                                :width="100"
                                alignment="center" 
                                cell-template="integrityTemplate"
                            >
                                <DxLookup :data-source="integrityList" display-expr="severity_level" value-expr="id" />
                            </DxColumn>
                            <template #integrityTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 1"></button>
                                </div>
                            </template>
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <div class="circle-wrapper">
                            <div class="circle-row" v-for="(status, index) in statusList" :key="index">
                                <div class="circle" :style="{ backgroundColor: GET_STATUS_COLOR(status) }" />
                                <span>{{ status }}</span>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 15px; margin-bottom: 20px;">
                        <!-- <div class="table-header-toolbar left" style="width: calc(100% - 231px)">
                            <label class="hd">Sea Water</label>
                        </div> -->
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Sea Water Circuit</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :selection="{ mode: 'single' }" 
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="id_integrity_status" 
                                caption="Integrity Status" 
                                :width="100"
                                alignment="center" 
                                cell-template="integrityTemplate"
                            >
                                <DxLookup :data-source="integrityList" display-expr="severity_level" value-expr="id" />
                            </DxColumn>
                            <template #integrityTemplate="{ data }">
                                <div>
                                    <button class="btn-green" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 3"></button>
                                    <button class="btn-yellow" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 2"></button>
                                    <button class="btn-red" @click="viewDetail(data.data)" v-if="data.data.id_integrity_status == 1"></button>
                                </div>
                            </template>
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <!-- Configuration goes here -->
                            <!-- <DxFilterRow :visible="true" /> -->
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <div class="circle-wrapper">
                            <div class="circle-row" v-for="(status, index) in statusList" :key="index">
                                <div class="circle" :style="{ backgroundColor: GET_STATUS_COLOR(status) }" />
                                <span>{{ status }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div fill v-if="active_tab === tabs[1]" class="table-chart" style="margin-bottom: 20px;">
                    <div>
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Pipeline System</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="pipelineSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                            @cell-prepared="onCellPrepared"
                        >
                            <DxColumn 
                                data-field="platform" 
                                caption="Platform" 
                                :width="100"
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="tag_no" 
                                caption="Tag No." 
                                :width="120"
                                alignment="left" 
                            />
                            <DxColumn caption="Splash Pig">
                                <DxColumn 
                                    data-field="pigging_operation_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center"
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                                <DxColumn 
                                    data-field="pigging_operation_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                />
                            </DxColumn>
                            <DxColumn caption="Water Analysis">
                                <DxColumn 
                                    data-field="water_analysis_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center" 
                                />
                                <DxColumn 
                                    data-field="water_analysis_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                />
                            </DxColumn>
                            <DxColumn caption="Microbiological Bacteria">
                                <DxColumn 
                                    data-field="micro_bacteria_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center" 
                                />
                                <DxColumn 
                                    data-field="micro_baceria_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                />
                            </DxColumn>
                            <DxColumn caption="Corrosion Coupon">
                                <DxColumn 
                                    data-field="corrosion_coupon_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                                <DxColumn 
                                    data-field="corrosion_coupon_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                            </DxColumn>
                            <DxColumn caption="ER Probe">
                                <DxColumn 
                                    data-field="er_probe_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                                <DxColumn 
                                    data-field="er_probe_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                            </DxColumn>
                            <DxColumn caption="R-CI">
                                <DxColumn 
                                    data-field="rci_latest_date" 
                                    caption="Latest Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                                <DxColumn 
                                    data-field="rci_next_due_date" 
                                    caption="Next Due Date" 
                                    :width="100"
                                    alignment="center" 
                                    data-type="date"
                                    format="MMM yyyy"
                                />
                            </DxColumn>
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="130"
                                alignment="left" 
                            />
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Cooling Medium Circuit</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                            @cell-prepared="onCellPrepared"
                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="latest_date" 
                                caption="Latest Date" 
                                :width="100"
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="next_due_date" 
                                caption="Next Due Date" 
                                :width="100"
                                alignment="center" 
                                cell-template="dueTemplate"
                            />
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <template #dueTemplate="{ data }">
                                <div>
                                    <button class="btn-detail" @click="viewDueDetail(data.data)">{{ data.data.next_due_date }}</button>
                                </div>
                            </template>
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Produce Water</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                            @cell-prepared="onCellPrepared"
                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="latest_date" 
                                caption="Latest Date" 
                                :width="100"
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="next_due_date" 
                                caption="Next Due Date" 
                                :width="100"
                                alignment="center" 
                                cell-template="dueTemplate"
                            />
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <template #dueTemplate="{ data }">
                                <div>
                                    <button class="btn-detail" @click="viewDueDetail(data.data)">{{ data.data.next_due_date }}</button>
                                </div>
                            </template>
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                        <h4 style="margin: 15px 0 15px; font-size: 24px;">Sea Water</h4>
                        <DxDataGrid 
                            id="data-grid-dashboard" 
                            key-expr="id" 
                            :data-source="coolingMediumSystemList"
                            :hover-state-enabled="true" 
                            :allow-column-reordering="true"
                            :show-borders="true" 
                            :show-row-lines="true" 
                            :row-alternation-enabled="false" 
                            :word-wrap-enabled="true"
                            :column-auto-width="true" 
                            @cell-prepared="onCellPrepared"
                        >
                            <DxColumn 
                                data-field="activity" 
                                caption="Activity" 
                                :width="200"
                                alignment="left" 
                            />
                            <DxColumn 
                                data-field="latest_date" 
                                caption="Latest Date" 
                                :width="100"
                                alignment="center" 
                            />
                            <DxColumn 
                                data-field="next_due_date" 
                                caption="Next Due Date" 
                                :width="100"
                                alignment="center" 
                                cell-template="dueTemplate"
                            />
                            <DxColumn 
                                data-field="note" 
                                caption="Note" 
                                :min-width="150"
                                alignment="left" 
                            />
                            <template #dueTemplate="{ data }">
                                <div>
                                    <button class="btn-detail" @click="viewDueDetail(data.data)">{{ data.data.next_due_date }}</button>
                                </div>
                            </template>
                            <DxScrolling mode="standard" />
                            <DxSearchPanel :visible="false" />
                        </DxDataGrid>
                    </div>
                </div>
            </div>
        </div>
        <WaterAnalysisIntegrityDetail 
            v-if="isShow === 1" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <MicroBacteriaIntegrityDetail 
            v-if="isShow === 2" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <CorrosionCouponIntegrityDetail 
            v-if="isShow === 3" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <ERProbeIntegrityDetail 
            v-if="isShow === 4" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />

        <WaterAnalysisDueDetail 
            v-if="isDueShow === 1" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <MicroBacteriaDueDetail 
            v-if="isDueShow === 2" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <CorrosionCouponDueDetail 
            v-if="isDueShow === 3" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
        <ERProbeDueDetail 
            v-if="isDueShow === 4" 
            :selectedData="selectedData" 
            @popup="CLOSE_POPUP"
        />
    </div>
</template>

<script>
// import { axios } from "/axios.js";
// import moment from "moment";
import WaterAnalysisIntegrityDetail from "./WaterAnalysisIntegrityDetail.vue"
import WaterAnalysisDueDetail from "./WaterAnalysisDueDetail.vue"
import MicroBacteriaIntegrityDetail from "./MicroBacteriaIntegrityDetail.vue"
import MicroBacteriaDueDetail from "./MicroBacteriaDueDetail.vue"
import CorrosionCouponIntegrityDetail from "./CorrosionCouponIntegrityDetail.vue"
import CorrosionCouponDueDetail from "./CorrosionCouponDueDetail.vue"
import ERProbeIntegrityDetail from "./ERProbeDetail.vue"
import ERProbeDueDetail from "./ERProbeDueDetail.vue"
import "devextreme/dist/css/dx.light.css";
import {
    DxDataGrid,
    DxSearchPanel,
    // DxPaging,
    // DxPager,
    DxScrolling,
    DxColumn,
    // DxExport,
    // DxToolbar,
    // DxHeaderFilter,
    // DxSelection,
    // DxEditing,
    // DxFilterRow,
    // DxButton,
    DxLookup,
    // DxRequiredRule,
    // DxFormItem,
    // DxForm,
    // DxMasterDetail,
} from "devextreme-vue/data-grid";
export default {
    name: "cm-dashboard",
    components: {
        DxDataGrid,
        DxSearchPanel,
        // DxPaging,
        // DxPager,
        DxScrolling,
        DxColumn,
        // DxExport,
        // DxToolbar,
        // DxHeaderFilter,
        // DxSelection,
        // DxForm,
        // DxItem,
        // DxEditing,
        // DxFilterRow,
        // DxButton,
        DxLookup,
        // DxSelectBox,
        // DxTextBox,
        // DxDateBox,
        // DxTextArea,
        // DxMasterDetail,
        WaterAnalysisIntegrityDetail,
        MicroBacteriaIntegrityDetail,
        CorrosionCouponIntegrityDetail,
        ERProbeIntegrityDetail,
        MicroBacteriaDueDetail,
        WaterAnalysisDueDetail,
        CorrosionCouponDueDetail,
        ERProbeDueDetail,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "DASHBOARD",
            subpageInnerName: null,
        });
        // if (this.$store.state.status.server == true) {
        // }
    },
    data() {
        return {
            statusList: ['Low', 'Moderate', 'High'],
            tabs: ['Integrity Summary', 'Monitoring Schedule'],
            active_tab: 'Integrity Summary',
            isShow: 0,
            isDueShow: 0,
            selectedData: null,
            pipelineSystemList: [
                {
                    id: 1,
                    platform: 'MDB',
                    tag_no: '18-MDB-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 2,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 1,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 2,
                    platform: 'MDC',
                    tag_no: '18-MDC-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 3,
                    platform: 'MDD',
                    tag_no: '18-MDD-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 2,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 4,
                    platform: 'MDE',
                    tag_no: '18-MDE-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 2,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 5,
                    platform: 'JKA',
                    tag_no: '24-JKA-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 2,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 6,
                    platform: 'JKB',
                    tag_no: '18-JKB-JKA',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 1,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 7,
                    platform: 'TPA',
                    tag_no: '18-TPA-MDB',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 1,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 8,
                    platform: 'TPB',
                    tag_no: '18-TPB-TPA',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 9,
                    platform: 'MTA',
                    tag_no: '18-MTA-JKB',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 2,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
                {
                    id: 10,
                    platform: 'MDF',
                    tag_no: '18-MDF-MDPP',
                    id_pigging_operation: 3,
                    id_water_analysis: 3,
                    id_micro_bacteria: 3,
                    id_corrosion_coupon: 3,
                    id_er_probe: 3,
                    id_ci: 3,
                    id_rci: null,
                    pigging_operation_latest_date: '01 Jan 2023',
                    pigging_operation_next_due_date: '',
                    id_pigging_operation_due: 3,
                    water_analysis_latest_date: 'H1 2024',
                    water_analysis_next_due_date: 'H2 2024',
                    id_water_analysis_due: 3,
                    micro_bacteria_latest_date: 'H1 2024',
                    micro_bacteria_next_due_date: 'H2 2024',
                    id_micro_bacteria_due: 3,
                    corrosion_coupon_latest_date: '01 Jan 2024',
                    corrosion_coupon_next_due_date: '01 July 2024',
                    id_corrosion_coupon_due: 3,
                    er_probe_latest_date: '01 Jan 2024',
                    er_probe_next_due_date: '01 July 2024',
                    id_er_probe_due: 3,
                    id_ci_due: 3,
                    rci_latest_date: '01 Jun 2024',
                    rci_next_due_date: '01 July 2024',
                    id_rci_due: null,
                    note: null
                },
            ],
            coolingMediumSystemList: [
                {
                    id: 1,
                    activity: 'Water Analysis',
                    id_integrity_status: 1,
                    latest_date: 'H2 2024',
                    next_due_date: 'H1 2025',
                    id_due_status: 3,
                    note: '',
                },
                {
                    id: 2,
                    activity: 'Microbiological Bacteria',
                    id_integrity_status: 1,
                    latest_date: 'H1 2024',
                    next_due_date: 'H2 2024',
                    id_due_status: 2,
                    note: '',
                },
                {
                    id: 3,
                    activity: 'Corrosion Coupon',
                    id_integrity_status: 2,
                    latest_date: '24 Dec 2023',
                    next_due_date: '25 May 2024',
                    id_due_status: 1,
                    note: '',
                },
                {
                    id: 4,
                    activity: 'ER Probe',
                    id_integrity_status: 3,
                    latest_date: '1 Jun 2024',
                    next_due_date: '1 Sep 2024',
                    id_due_status: 3,
                    note: '',
                }
            ],
            integrityList: [
                {
                    "id": 1,
                    "severity_level": "High",
                    "color_name": "Red",
                    "color_code": "#ff0000",
                    "sort_no": 1
                },
                {
                    "id": 2,
                    "severity_level": "Moderate",
                    "color_name": "Yellow",
                    "color_code": "#ffdd00",
                    "sort_no": 2
                },
                {
                    "id": 3,
                    "severity_level": "Low",
                    "color_name": "Green",
                    "color_code": "#00e676",
                    "sort_no": 3
                }
            ],
            dueStatusList: [
                {
                    "id": 1,
                    "name": "Overdue",
                    "color_code": "#ff0000",
                },
                {
                    "id": 2,
                    "name": "Ondue",
                    "color_code": "#ffdd00",
                },
                {
                    "id": 3,
                    "name": "Notdue",
                    "color_code": "#00e676",
                }
            ],
        };
    },
    computed: {},
    methods: {
        onCellPrepared(e) {

            if(e.rowType === "data" && e.column.dataField === "pigging_operation_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_pigging_operation_due);
            }
            if(e.rowType === "data" && e.column.dataField === "water_analysis_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_water_analysis_due);
            }
            if(e.rowType === "data" && e.column.dataField === "micro_baceria_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_micro_bacteria_due);
            }
            if(e.rowType === "data" && e.column.dataField === "corrosion_coupon_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_corrosion_coupon_due);
            }
            if(e.rowType === "data" && e.column.dataField === "er_probe_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_er_probe_due);
            }
            if(e.rowType === "data" && e.column.dataField === "rci_next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_rci_due);
            }
            if(e.rowType === "data" && e.column.dataField === "next_due_date") {
                e.cellElement.style.backgroundColor = this.GET_DUE_STATUS_COLOR(e.row.data.id_due_status);
            }
        },
        GET_INTEGRITY_STATUS_COLOR(value) {
            const v = this.integrityList.filter(i => i.id == value);
            return v[0].color_code;
        },
        GET_INTEGRITY_STATUS_WORD(value) {
            const v = this.integrityList.filter(i => i.id == value);
            return v[0].severity_level;
        },
        GET_DUE_STATUS_COLOR(value) {
            if(value) {
            const v = this.dueStatusList.filter(i => i.id == value);
            return v[0].color_code;
            } else {
                return '#ffffff';
            }
        },
        GET_DUE_STATUS_WORD(value) {
            const v = this.dueStatusList.filter(i => i.id == value);
            return v[0].name;
        },
        viewDetail(e) {
            console.log(e);
            this.selectedData = e;
            this.isShow = e.id;
        },
        viewDueDetail(e) {
            console.log(e);
            this.selectedData = e;
            this.isDueShow = e.id;
        },
        CLOSE_POPUP() {
            this.isShow = 0;
            this.isDueShow = 0;
        },
        GET_STATUS_COLOR(value) {
            const status = value.toLowerCase();
            switch (status) {
                case 'low': return '#00e676';
                case 'moderate': return '#ffdd00';
                case 'high': return '#FF0000';

                default: return '#000';
            }
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
    overflow-y: hidden;
}

.page-section {
    padding: 20px;
    height: calc(100vh - 235px);
    overflow-y: auto;
    grid-row: span 2;
}

.table-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 15px;

    .table-tabs-buttons {
        display: flex;
        flex-direction: row;
        gap: 5px;

        button {
            border-radius: 0;
            padding: 10px;
            width: 130px;
        }
        .active {
            color: white;
            background-color: $web-theme-color-secondary;
            border: solid 1px $web-theme-color-secondary;
        }
    }

    button {
        padding: 10px 0;
        background-color: white;
        border: solid 1px gray;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        transition: 1s;
        cursor: pointer;
    }

}

.page-section:last-child {
    padding-bottom: 20px;
}

.hd {
  line-height: 36px;
  user-select: text;
  cursor: text;
  font-size: 18px;
  font-weight: 600;
  color: $dexon-primary-blue;
}

.btn-detail {
    font-family: "Helvetica Neue","Segoe UI",helvetica,verdana,sans-serif;
    width: 80px;
    height: 25px;
    font-size: 11px;
    font-weight: 500;
    border: none;
    background-color: transparent;
    cursor: pointer;
}

.btn-green {
    color: white;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #00e676;
}

.btn-yellow {
    color: white;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #ffdd00;
}

.btn-red {
    color: white;
    padding: 7px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 10px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 50%;
    border: none;
    background-color: #ff0000;
}

.circle-wrapper {
    margin-top: 10px;
    display: flex;
    gap: 20px;

    .circle-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;

        .circle {
            display: block !important;
            margin: 0;
            width: 22px;
            height: 22px;
            border-radius: 50%;
        }

        span {
            font-size: 12px;
        }
    }
}
.circle-row {
    display: flex;
        flex-direction: row;
        align-items: center;
        gap: 6px;

    .circle {
        display: block !important;
        margin: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
    }

    .green {
        background-color: #00e676;
    }

    .yellow {
        background-color: #ffdd00;
    }

    .red {
        background-color: #ff0000;
    }

    span {
        font-size: 10px;
    }
}
.ul-detail-i,
.ul-detail-ii {
    padding-inline-start: 10px;
    list-style-type: none;
}
.li-header {
    font-size: 10px;
    font-weight: 600;
}
</style>