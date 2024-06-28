<template>
    <div id="user-panel">

        <div class="page-container">
            <div class="wrapper">
                <div class="left-col">
                    <span>{{ calname.currentPageName }}</span>
                </div>
            </div>
        </div>

        <div class="bg-filter"></div>
    </div>
</template>
<script>
export default {
    name: "app-banner",
    create() {},
    props: {
        calname: Object,
    },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    watch: {},
};
</script>
<style lang="scss" scoped>
@import "@/style/main.scss";
#user-panel {
    background-image: url("/public/img/banner.png");
    background-size: cover;
    background-position: 50% 45%;
    background-repeat: no-repeat;
    position: relative;
    height: 120px;

    .page-container {
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        margin: 0 !important;
        padding: 0 !important;
    }

    .wrapper {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;

        .left-col {
            position: absolute;
            left: 2%;
            color: white;
            text-shadow: 3px 6px 9px rgba(0, 0, 0, 0.4);
            font-size: 26px;
            font-weight: 600;
        }

        .right-col {
            display: flex;
            justify-content: center;
            align-items: flex-end;
            flex-direction: column;

            span,
            i {
                color: white;
                text-shadow: white;
            }

            span {
                font-size: 14px;
            }

            i {
                font-size: 20px;
                margin-left: 10px;
                margin-right: 0;
            }

            .banner-button:hover {
                background-color: #f0f0f029;
            }
        }
    }

    .bg-filter {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(90deg, $web-theme-color-secondary 20%, rgba(39, 89, 168, 0) 80%);
    }
}
</style>