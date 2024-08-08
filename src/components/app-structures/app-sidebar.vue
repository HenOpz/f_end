<template>
    <div class="app-sidebar" :class="[sidebarHiding == true ? 'app-sidebar-hide' : 'app-sidebar']">
        <div class="item-container">
            <template v-for="(route, index) in routes">
                <div class="section-label" v-if="!route.url && !route.line" :key="'title_' + index">
                    <label>{{ route.name }}</label>
                </div>
                <router-link :to="route.url" v-if="route.url && !route.menu" :key="'route_' + index">
                    <v-ons-toolbar-button class="item"
                        :class="{ 'active': path.split('/')[2] === route.url.split('/')[2] }">
                        <img class="svg" :src="route.icon" :style="{ width: route.icon.size, height: route.icon.size }" />
                        <span>{{ route.name }}</span>
                    </v-ons-toolbar-button>
                </router-link>
                <router-link :to="route.url" :disabled="true" tag="button" class="popup-button-caller"
                    v-if="route.url && route.menu" :key="'route_button_' + index">
                    <v-ons-toolbar-button @click="SHOW_POPOVER($event, 'right', true, route.name)" class="item" :class="{ 'active': path.split('/')[2] === route.url.split('/')[2] }">
                        <img class="svg" :src="route.icon" />
                        <span>{{ route.name }}</span>
                        <i class="las la-angle-right right-arrow"></i>
                    </v-ons-toolbar-button>
                </router-link>
                <v-ons-popover cancelable :visible="FETCH_POPUP_VISIBILITY(route.name)"
                    @update:visible="value => SET_POPUP_VISIBILITY(route.name, value)" :target="popoverTarget"
                    :direction="popoverDirection" :cover-target="coverTarget" :key="'route_menu_' + index">
                    <v-ons-toolbar-button id="popover-button" class="popover-button"
                        v-for="(item, index) in route.menu" :key="index" v-on:click="GO_TO(item.url)">
                        <span>{{ item.name }}</span>
                        <i class="las la-angle-right"></i>
                    </v-ons-toolbar-button>
                </v-ons-popover>
                <div class="line" v-if="route.line" :key="'line_' + index">
                    <hr />
                </div>
            </template>
        </div>
        <div class="item-container fixed-panel">
            <v-ons-toolbar-button class="item bottom-btn" v-on:click="SHOW_HIDE_SIDEBAR()">
                <i class="las la-caret-square-left" v-if="sidebarHiding == false"></i>
                <i class="las la-caret-square-right" v-if="sidebarHiding == true"></i>
                <span>Hide Sidebar</span>
            </v-ons-toolbar-button>
        </div>
    </div>
</template>

<script>
// import axios from "/axios.js";

export default {
    name: "app-sidebar",
    created() {
        if (this.routes.length > 0) {
            this.routes.forEach(route => {
                route.menu && this.popup.push({ [route.name]: false });
            });
            this.path = this.$route.path;
        }
    },
    props: {
        routes: Array,
    },
    data() {
        return {
            id_tag: this.$route.params.id_tag,
            asset_name: this.$route.params.asset_name,
            sidebarHiding: false,
            popup: [],
            popoverTarget: null,
            popoverDirection: "right",
            coverTarget: false,
            path: null
        };
    },
    computed: {},
    methods: {
        SHOW_HIDE_SIDEBAR() {
            if (this.sidebarHiding == false) this.sidebarHiding = true;
            else this.sidebarHiding = false;
            this.$emit("resizeGridLayout");
        },
        FETCH_POPUP_VISIBILITY(routeName) {
            let visibility = false;
            this.popup.forEach(popup => {
                if (Object.prototype.hasOwnProperty.call(popup, routeName)) {
                    visibility = popup[routeName];
                    console.log('visibility', popup[routeName]);
                }
            });
            return visibility;
        },
        SET_POPUP_VISIBILITY(routeName, value) {
            console.log('path', this.path.split('/')[2], this.routes[2].url.split('/')[2]);
            this.popup.forEach(popup => {
                if (Object.prototype.hasOwnProperty.call(popup, routeName)) {
                    popup[routeName] = value;
                }
            });
        },
        SHOW_POPOVER(event, direction, coverTarget = false, target) {
            this.popoverTarget = event.target.parentElement;
            this.popoverDirection = direction;
            this.coverTarget = coverTarget;
            this.SET_POPUP_VISIBILITY(target, true);
        },
        GO_TO(path) {
            this.$store.commit("SET_SHOW_BACK_BUTTON", true);
            this.popup.forEach(popup => {
                for (const key in popup) {
                    if (Object.prototype.hasOwnProperty.call(popup, key)) {
                        popup[key] = false;
                    }
                }
            });
            this.$router.push({
                path: path,
                replace: true
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.app-sidebar {
    width: 200px;
    height: calc(100% - 120px);
    background: linear-gradient(180deg, $web-theme-color-secondary 0%, rgba(90,127,67, 1) 120%);
    border: 1px solid #e6e6e6;
    border-width: 0 1px 0 0;
    position: relative;
    transition: all 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    .item-container {
        width: 100%;
        padding-top: 20px;
        transition: all 0.3s;

        .active {
            background: $dexon-primary-green;
        }

        .section-label {
            margin-left: 20px;
            margin-top: 20px;
            transition: all 0.3s;

            label {
                font-size: 12px;
                font-weight: 400;
                color: #ffffff92;
                font-style: normal;
                transition: all 0.3s;
            }

            hr {
                width: -webkit-fill-available;
                margin-right: 10px;
                display: none;
                transition: all 0.3s;
            }
        }

        .section-label:first-child {
            margin-top: 0px;
        }

        .item {
            width: 180px;
            padding: 0;
            height: 34px;
            // display: flex;
            justify-content: flex-start;
            align-items: center;
            border-radius: 6px;
            margin: 10px auto;
            border: 0px;
            transition: all 0.3s;

            i {
                margin-left: 15px;
                color: $web-font-color-white;
            }

            span {
                color: $web-font-color-white;
                font-weight: 500;
                font-size: 12px;
                transition: all 0.3s;
            }

            img {
                width: 18px;
                max-height: 18px;
                object-fit: contain;
                margin-left: 10px;
                margin-right: 10px;
            }

            .svg {
                object-fit: contain;
                margin-left: 10px;
                margin-right: 10px;
            }

            i.right-arrow {
                margin-left: auto;
                font-size: 14px;
            }
        }

        .item:not(:empty)>*:first-child {
            margin-left: 10px;
            margin-right: 10px;
        }

        .item:hover,
        .active
        // .router-link-active > .item,
        .router-link-exact-active>.item {
            background: $dexon-primary-green;
        }

        .bottom-btn {
            justify-content: center;

            i {
                margin: 0 10px;
                margin-left: 0;
            }
        }

        .line {
            padding: 6px;
            width: 180px;
        }
    }

    .fixed-panel {
        // background-color: $web-theme-color-secondary;
    }
}

@media screen and (max-width: 1024px) {
    .app-sidebar {
        width: fit-content;
        transition: all 0.3s;

        .item-container {
            width: 54px;
            padding-top: 10px;

            .section-label {
                margin: 0;

                label {
                    display: none;
                }

                hr {
                    margin: 0 10px;
                    display: block;
                    transition: all 0.3s;
                }
            }

            .item {
                display: flex;
                width: fit-content;
                justify-content: center;
                align-items: center;

                span,
                i {
                    display: none;
                }
            }

            .bottom-btn {
                display: none;
                width: 38px;

                i {
                    display: inherit !important;
                    margin: 0;
                }
            }

            .line {
                display: none;
            }
        }
    }
}

.popup-button-caller {
    width: 100%;
    background-color: unset;
    border: none;
    padding: 0;
    margin: 0;
    margin-bottom: -10px;
    // margin-top: -10px;
}

.popover-button {
    padding: 6px 5px 6px 18px;
    border: 1px solid #e6e6e6;
    border-width: 0 0 1px 0;

    i {
        font-size: 14px;
    }
}

.popover-button:hover {
    background-color: #f3f3f3;
}

.popover-button:last-child {
    border: 0;
}

.app-sidebar-hide {
    width: fit-content;
    transition: all 0.3s;

    .item-container {
        width: 54px;
        padding-top: 10px;

        .section-label {
            margin: 0;

            label {
                display: none;
            }

            hr {
                margin: 0 10px;
                display: block;
                transition: all 0.3s;
            }
        }

        .line {
            display: none;
        }

        .item {
            display: flex;
            width: fit-content;
            justify-content: center;
            align-items: center;

            span,
            i {
                display: none;
            }
        }

        .bottom-btn {
            width: 38px;

            i {
                display: inherit !important;
                margin: 0;
            }
        }
    }
}
</style>