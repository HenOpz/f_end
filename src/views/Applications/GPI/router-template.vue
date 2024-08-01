<template>
    <div class="pm-page" :class="[sidebarHiding == true ? 'pm-page-none-sidbar' : 'pm-page']">
        <toolbar pageSubName="General Platform Inspection" :isBack="$store.state.showBackButton"
            style="grid-column: span 3" />
        <sidebar :routes="routes" @resizeGridLayout="RESIZE_GRID_LAYOUT()"
            style="grid-column: span 1; grid-row: span 2;"></sidebar>
        <banner :calname="calname" style="grid-column: span 2"></banner>

        <div class="pm-page-container">
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </div>
</template>

<script>
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
            name: "CPOC IMS",
            //icon: "/img/icon_menu/equipment/piping.png"
        });
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: "CPOC IMS",
            subpageInnerName: null
        });
        if (this.$store.state.status.server == true) {
            console.log('online');
        }
        this.calname = this.$store.state
        console.log(this.$store)
    },
    data() {
        return {
            sidebarHiding: false,
            isAdd: false,
            calname: {},
            routes: [
                {
                    name: 'Information'
                },
                {
                    url: '/gpi',
                    icon: "/img/svg/pie-chart-svg.svg",
                    name: 'Dashboard'
                },
                {
                    url: '/gpi/gpi-record',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'GPI Record'
                },
                {
                    url: '/gpi/gpi-pending-approval',
                    icon: "/img/svg/rewind-time-svg.svg",
                    name: 'Pending Approval'
                },
                {
                    url: '/gpi/sap-tracking',
                    icon: "/img/svg/list-check-solid.svg",
                    name: 'SAP Tracking'
                },
                {
                    line: true
                },
                {
                    url: '/gpi/gpi-approval-process',
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