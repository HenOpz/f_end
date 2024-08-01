<template>
    <div>
        <ViewPage
            v-if="current_view == 0"
            @currentView="(view, row) => SET_EDIT(view, row)"
        />
        <AddPage
            v-if="current_view == 1"
            @currentView="(view, row) => SET_EDIT(view, row)"
        />
        <EditPage
            :data_row="edit_row"
            v-if="current_view == 2"
            @currentView="(view) => (current_view = view)"
        />
        <ReportPage
            :data_row="edit_row"
            v-if="current_view == 3"
            @currentView="(view) => (current_view = view)"
        />
        <PendingPage
            v-if="current_view == 4"
            @currentView="(view, row) => SET_EDIT(view, row)"
        />
    </div>
</template>

<script>
//Structures
import ViewPage from "./View.vue";
import AddPage from "./Add.vue";
import EditPage from "./Edit.vue";
import ReportPage from "./Report.vue";
import PendingPage from "../PendingApproval/Page.vue";

export default {
    name: "gpi-record",
    components: {
        ViewPage,
        AddPage,
        EditPage,
        ReportPage,
        PendingPage,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "GPI REPORT",
            subpageInnerName: null,
        });
        console.log('innn');
    },
    data() {
        return {
            current_view: 0,
            edit_row: {},
        };
    },
    computed: {},
    methods: {
        SET_EDIT(view, row) {
            console.log('in')
            this.current_view = view;
            if (row) this.edit_row = row;
        },
    },
};
</script>

<style
    lang="scss"
    scoped
>
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
    overflow-y: auto;
    grid-row: span 2;
}

.page-section:last-child {
    padding-bottom: 20px;
}
</style>
