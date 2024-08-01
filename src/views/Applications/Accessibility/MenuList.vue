<template>
    <div>
        <DxDataGrid
            id="data-grid-list"
            key-expr="id"
            :data-source="menuInUserList"
            :selection="{ mode: 'single' }"
            :hover-state-enabled="true"
            :allow-column-reordering="false"
            :show-borders="true"
            :show-row-lines="false"
            :row-alternation-enabled="true"
        >
            <DxColumn data-field="id_app_module" caption="Module">
                <DxLookup :data-source="moduleList" display-expr="name" value-expr="id" />
            </DxColumn>
            <DxColumn data-field="name" caption="Menu" />
            <DxFilterRow :visible="true" />
            <DxHeaderFilter :visible="true" />
            <DxScrolling mode="standard" />
            <DxSearchPanel :visible="true" />
            <DxPaging :page-size="10" :page-index="0" />
            <DxPager
                :show-page-size-selector="true"
                :allowed-page-sizes="[5, 10, 20]"
                :show-navigation-buttons="true"
                :show-info="true"
                info-text="Page {0} of {1} ({2} items)"
            />
            <DxToolbar>
                <DxItem location="after" template="action-add-template">
                </DxItem>
            </DxToolbar>

            <template #action-add-template="{ }">
              <DxButton icon="plus" @click="GET_MENU_IN_USER"  />
            </template>

        </DxDataGrid>

        <DxPopup
            :visible="popupVisible"
            :drag-enabled="false"
            :hide-on-outside-click="true"
            :show-close-button="false"
            :show-title="true"
            :width="600"
            :height="580"
            title="Menu List"
        >
        <DxToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            :options="submitButton"
        />
        <DxToolbarItem
            widget="dxButton"
            toolbar="bottom"
            location="after"
            :options="closeButton"
        />
        <DxScrollView
          width="100%"
          height="100%"
        >
            <!-- {{ this.selectedMenus }} -->
            <DxDataGrid
                id="data-grid-list"
                key-expr="id"
                :data-source="menuList"
                :selection="{ mode: 'single' }"
                :hover-state-enabled="true"
                :allow-column-reordering="false"
                :show-borders="true"
                :show-row-lines="false"
                :row-alternation-enabled="true"
                :selected-row-keys="selectedRowKeys"
                @selection-changed="onSelectionChanged"
            >
                <DxColumn data-field="id_app_module" caption="Module">
                    <DxLookup :data-source="moduleList" display-expr="name" value-expr="id" />
                </DxColumn>
                <DxColumn data-field="name" caption="Menu" />

                <DxSelection
                    select-all-mode="allPages"
                    show-check-boxes-mode="always"
                    mode="multiple"
                > 
                </DxSelection>
                <DxFilterRow :visible="true" />
                <DxHeaderFilter :visible="true" />
                <DxScrolling mode="standard" />
                <DxSearchPanel :visible="false" />
                <DxPaging :page-size="10" :page-index="0" />
                <DxPager
                    :show-page-size-selector="true"
                    :allowed-page-sizes="[10, 20, 30]"
                    :show-navigation-buttons="true"
                    :show-info="true"
                    info-text="Page {0} of {1} ({2} items)"
                />
            </DxDataGrid>
        </DxScrollView>
        </DxPopup>
    </div>
</template>
<script>
import { GET_DATA, PUT_DATA } from "/axios.js";
import "devextreme/dist/css/dx.light.css";
import DxButton from "devextreme-vue/button";
import { DxPopup, DxToolbarItem } from 'devextreme-vue/popup';
import { DxScrollView } from 'devextreme-vue/scroll-view';
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxFilterRow,
    DxHeaderFilter,
    DxToolbar,
    DxItem,
    DxSelection,
    DxLookup,
} from "devextreme-vue/data-grid";
export default {
    name: "menu-list",
    props: {
        accountData: Object
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
        DxToolbar,
        DxItem,
        DxButton,
        DxPopup,
        DxToolbarItem,
        DxScrollView,
        DxSelection,
        DxLookup,
    },
    created() {
        this.$store.commit("UPDATE_CURRENT_PAGENAME", {
            subpageName: null,
            subpageInnerName: null,
        });
        GET_DATA(this, '/Md/get-md-app-module-list', 'moduleList');
        GET_DATA(this, `/UserInMenu/get-menu-list-by-id-user?id_user=${this.accountData.key}`, 'menuInUserList');
        GET_DATA(this, '/Md/get-md-menu-list', 'menuList');
        this.closeButton = {
            text: 'CLOSE',
            onClick: () => {
                this.popupVisible = false;
            }
        }
        this.submitButton = {
            text: 'SUBMIT',
            onClick: () => {
                if(this.selectedMenus.length > 0) {
                    const user = JSON.parse(localStorage.getItem("user"));
                    this.MODIFY_USER_IN_MENU(); PUT_DATA(`/UserInMenu/modify-user-in-menu?id_user=${this.accountData.key}&created_by=${user.id}`, this.selectedMenus, () => {
                        this.popupVisible = false;
                        GET_DATA(this, `/UserInMenu/get-menu-list-by-id-user?id_user=${this.accountData.key}`, 'menuInUserList');
                    });
                }
            }
        }
    },
    data() {
        return {
            moduleList: {},
            menuList: {},
            menuInUserList: {},
            popupVisible: false,
            closeButton: '',
            submitButton: '',
            selectedRowKeys: [],
            selectedMenus: [],
        }
    },
    comments: {},
    methods: {
        GET_MENU_IN_USER() {
            this.selectedRowKeys = [];
            this.selectedMenus = [];
            for (let i = 0; i < this.menuInUserList.length; i++) {
                this.selectedRowKeys.push(this.menuInUserList[i].id);
            }
            this.popupVisible = true;
        },
        onSelectionChanged(e) {
            this.selectedMenus = e.selectedRowKeys;
            console.log('selectedMenus', this.selectedMenus);
        },
    }
}
</script>