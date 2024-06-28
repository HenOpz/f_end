<template>
    <div>
        <ViewPage v-if="current_view == 0" @currentView="(view, row) => SET_EDIT(view, row)" />
        <DetailPage :id_record="edit_row" :moc_no="moc_no" v-if="current_view == 1" @currentView="(view) => current_view = view" />
    </div>
</template>

<script>

//Structures
import ViewPage from "./View.vue"
import DetailPage from "./Detail.vue"

export default {
    name: "inspection-record",
    components: {
        ViewPage,
        DetailPage,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "MANAGEMENT OF CHANGE",
            subpageInnerName: null,
        });
    },
    data() {
        return {
            current_view: 0,
            edit_row: 0,
        };
    },
    computed: {},
    methods: {
        SET_EDIT(view, row, moc_no) {
            console.log('moc', moc_no);
            this.current_view = view;
            this.edit_row = row;
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