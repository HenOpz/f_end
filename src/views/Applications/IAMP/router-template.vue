<template>
    <div class="pm-page" :class="[sidebarHiding == true ? 'pm-page-none-sidbar' : 'pm-page']">
        <toolbar pageSubName="Inspection & Anomaly Monthly Performance" :isBack="$store.state.showBackButton" style="grid-column: span 3" />
        <sidebar :routes="routes" @resizeGridLayout="RESIZE_GRID_LAYOUT()"
            style="grid-column: span 1; grid-row: span 2;"></sidebar>
        <banner :calname="calname" style="grid-column: span 2"></banner>
        <div class="pm-page-container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
// import axios from "/axios.js";
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";
import sidebar from "@/components/app-structures/app-sidebar.vue";
import banner from "@/components/app-structures/app-banner.vue"

export default {
    name: "router-template-detail",
    components: {
        toolbar,
        sidebar,
        banner,

    },
    created() {
        this.$store.commit("UPDATE_CURRENT_INAPP", {
            name: "CPOC AIMS",
            //icon: "/img/icon_menu/equipment/piping.png"
        });
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CPOC AIMS",
            subpageInnerName: null
        });
        if (this.$store.state.status.server == true) {
            console.log('online');
        }
        this.calname = this.$store.state
    },
    data() {
        return {
            sidebarHiding: false,
            isAdd: false,
            calname: "",
            routes: [
                // {
                //     name: 'Information'
                // },
                {
                    url: '/iamp',
                    icon: "/img/svg/pie-chart-svg.svg",
                    name: 'Dashboard'
                },
                {
                    url: '/iamp/anomaly-iamp',
                    icon: "/img/svg/chart-line-solid.svg",
                    name: 'Executive Summary'
                },
                {
                    url: '/iamp/monthly-report',
                    icon: "/img/svg/newspaper-solid.svg",
                    name: 'Monthly Report'
                },
                {
                    line: true
                },
                {
                    url: '/iamp/inspection',
                    icon: "/img/svg/calender-svg.svg",
                    name: 'Inspection Due',
                    menu: [
                        {
                            url: '/iamp/inspection/flowline',
                            name: 'Flowline',
                        },
                        {
                            url: '/iamp/inspection/piping',
                            name: 'Piping',
                        },
                        {
                            url: '/iamp/inspection/vessel',
                            name: 'Pressure Vessel',
                        },
                        {
                            url: '/iamp/inspection/pipeline',
                            name: 'Pipeline',
                        },
                        {
                            url: '/iamp/inspection/outgoing_riser',
                            name: 'Outgoing Riser',
                        },
                        {
                            url: '/iamp/inspection/incoming_riser',
                            name: 'Incoming Riser',
                        },
                        {
                            url: '/iamp/inspection/structure',
                            name: 'Structure',
                        },
                        {
                            url: '/iamp/inspection/cylinder',
                            name: 'Cylinder',
                        },
                    ]
                },
                {
                    url: '/iamp/task',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Inspection Task'
                },
                // {
                //   url: '/iamp/moc',
                //   icon: "/img/svg/star-svg.svg",
                //   name: 'Management Of Change'
                // },
                {
                    line: true
                },
                {
                    url: '/iamp/hightlight-activities',
                    icon: "/img/svg/flat-i-solid.svg",
                    name: 'Highlight Activities'
                },
                {
                    url: '/iamp/inspection-campaign',
                    icon: "/img/svg/list-solid.svg",
                    name: 'Inspection Campaign'
                },
                {
                    url: '/iamp/rectification-campaign',
                    icon: "/img/svg/wrench-solid.svg",
                    name: 'Rectification Campaign'
                },
                {
                    url: '/iamp/cm-wo-management',
                    icon: "/img/svg/chart-column-solid.svg",
                    name: 'CM WO Management'
                },
                {
                    line: true
                },
                {
                    url: '/iamp/iamp-approval-process',
                    icon: "/img/svg/user-lock-solid.svg",
                    name: 'User Permission'
                },
            ]
        };
    },
    computed: {},
    methods: {
        RESIZE_GRID_LAYOUT() {
            this.sidebarHiding = !this.sidebarHiding;
        },
        TOGGLE_POPUPADD() {
            this.isAdd = !this.isAdd;
        },
        refreshPage() {
            this.$router.go();
        }
    }
};
</script>

<style lang="scss" scoped>
.pm-page {
    display: grid;
    grid-template-columns: 200px;
    grid-template-rows: 51px;
    // grid-template-columns: 200px calc(100vw - 200px);
    // grid-template-rows: 51px calc(100vh - 95px);
    overflow: hidden;
    transition: all 0.3s;

    .pm-page-container {
        background-color: #fff;
        grid-column: span 2;
        height: calc(100vh - 95px);
        margin: 0 !important;
    }
}

@media screen and (max-width: 1024px) {
    .pm-page {
        grid-template-columns: 54px calc(100vw - 54px);

        .pm-page-container {
            background-color: #fff;
        }
    }
}

.pm-page-none-sidbar {
    grid-template-columns: 54px calc(100vw - 54px);

    .pm-page-container {
        background-color: #fff;
    }
}
</style>