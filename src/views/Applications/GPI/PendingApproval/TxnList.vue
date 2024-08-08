<template>
    <div>
        <DxDataGrid
            id="data-grid-list"
            key-expr="id"
            :data-source="recordList"
            :hover-state-enabled="true"
            :allow-column-reordering="false"
            :show-borders="true"
            :show-row-lines="false"
            :row-alternation-enabled="true"
            style="margin-top: 5px"
        >
        <DxColumn
                data-field="seq"
                caption="Seq."
                :width="80"
                alignment="center"
            />
            <DxColumn
                data-field="id_user"
                caption="Name"
            >
                <DxLookup
                    :data-source="userList"
                    display-expr="name"
                    value-expr="id"
                />
            </DxColumn>
            <DxColumn
                data-field="id_status"
                caption="Transaction Status"
                alignment="center"
            >
                <DxLookup
                    :data-source="statusList"
                    display-expr="status"
                    value-expr="id"
                />
            </DxColumn>
            <DxColumn
                data-field="txn_datetime"
                caption="Transaction Date"
                dataType="date"
                format="dd MMM yyyy HH:mm:ss"
                alignment="center"
            />
            <DxColumn
                data-field="remark"
                caption="Remark"
            />
            <DxFilterRow :visible="false" />
            <DxHeaderFilter :visible="false" />
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="false" />
            <DxPaging
                :page-size="5"
                :page-index="0"
            />
            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
            />
        </DxDataGrid>
    </div>
</template>
<script>
import { GET_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxFilterRow,
    DxHeaderFilter,
    DxLookup,
} from "devextreme-vue/data-grid";
export default {
    name: "txn-list",
    props: {
        row: Object,
    },
    components: {
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxFilterRow,
        DxHeaderFilter,
        DxLookup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: null,
            subpageInnerName: null,
        });
        console.log("row:", this.row);

        GET_DATA(
            this,
            `/GpiRecordTXN/get-gpi-record-txn-by-id-gpi?id_gpi=${this.row.data.id}`,
            "recordList"
        );
        GET_DATA(this, "/User/get-user-list", "userList");
        GET_DATA(this, "/Md/get-md-gpi-approval-status-list", "statusList");
    },
    data() {
        return {
            userList: [],
            statusList: [],
            recordList: {},
        };
    },
    computed: {},
    methods: {},
};
</script>
