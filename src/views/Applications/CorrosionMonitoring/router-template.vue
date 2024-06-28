<template>
    <div class="pm-page" :class="[sidebarHiding == true ? 'pm-page-none-sidbar' : 'pm-page']">
        <toolbar pageSubName="Corrosion Monitoring" :isBack="$store.state.showBackButton" style="grid-column: span 3" />
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
        this.calname = this.$store.state;
    },
    data() {
        return {
            sidebarHiding: false,
            isAdd: false,
            calname: {},
            routes: [
                {
                    url: '/corrosion-monitoring/',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Dashboard'
                },
                {
                    url: '/corrosion-monitoring/cooling-medium',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Cooling Medium',
                    menu: [
                        {
                            url: '/corrosion-monitoring/cooling-medium/tag-registration',
                            name: 'Tag Registration',
                        },
                        {
                            url: '/corrosion-monitoring/cooling-medium/water-analysis',
                            name: 'Water Analysis',
                        },
                        {
                            url: '/corrosion-monitoring/cooling-medium/microbiological-bacteria',
                            name: 'Microbiological Bacteria',
                        },
                        {
                            url: '/corrosion-monitoring/cooling-medium/corrosion-coupon',
                            name: 'Corrosion Coupon',
                        },
                        {
                            url: '/corrosion-monitoring/cooling-medium/er-probe',
                            name: 'ER Probe',
                        },
                    ]
                },
                {
                    url: '/corrosion-monitoring/produced-water',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Produced Water',
                    menu: [
                        {
                            url: '/corrosion-monitoring/produced-water/tag-registration',
                            name: 'Tag Registration',
                        },
                        {
                            url: '/corrosion-monitoring/produced-water/water-analysis',
                            name: 'Water Analysis',
                        },
                        {
                            url: '/corrosion-monitoring/produced-water/microbiological-bacteria',
                            name: 'Microbiological Bacteria',
                        },
                        {
                            url: '/corrosion-monitoring/produced-water/corrosion-coupon',
                            name: 'Corrosion Coupon',
                        },
                        {
                            url: '/corrosion-monitoring/produced-water/er-probe',
                            name: 'ER Probe',
                        },
                    ]
                },
                {
                    url: '/corrosion-monitoring/sea-water',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Sea Water',
                    menu: [
                        {
                            url: '/corrosion-monitoring/sea-water/tag-registration',
                            name: 'Tag Registration',
                        },
                        {
                            url: '/corrosion-monitoring/sea-water/water-analysis',
                            name: 'Water Analysis',
                        },
                        {
                            url: '/corrosion-monitoring/sea-water/microbiological-bacteria',
                            name: 'Microbiological Bacteria',
                        },
                        {
                            url: '/corrosion-monitoring/sea-water/corrosion-coupon',
                            name: 'Corrosion Coupon',
                        },
                        {
                            url: '/corrosion-monitoring/sea-water/er-probe',
                            name: 'ER Probe',
                        },
                    ]
                },
                {
                    url: '/corrosion-monitoring/pipeline',
                    icon: "/img/svg/window-layout-svg.svg",
                    name: 'Pipeline',
                    menu: [
                        {
                            url: '/corrosion-monitoring/pipeline/tag-registration',
                            name: 'Tag Registration',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/pigging-operation',
                            name: 'Pigging Operation',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/water-analysis',
                            name: 'Water Analysis',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/microbiological-bacteria',
                            name: 'Microbiological Bacteria',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/corrosion-coupon',
                            name: 'Corrosion Coupon',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/er-probe',
                            name: 'ER Probe',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/chemical-injection',
                            name: 'Chemical Injection',
                        },
                        {
                            url: '/corrosion-monitoring/pipeline/residual-corrosion-inhibitor',
                            name: 'Residual Corrosion Inhibitor',
                        },
                    ]
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