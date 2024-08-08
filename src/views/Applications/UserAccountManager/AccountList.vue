<template>
    <div class="page-wrapper">
        <div class="page-toolbar">
            <toolbar pageSubName="User Account" @refreshInfo="FETCH_LIST()" :isNewBtn="true" newBtnLabel="New Account"
                @newBtnFn="TOGGLE_POPUP('add')" :isBack="true" />
        </div>
        <div class="page-content">
            <div class="table-tabs-buttons">
                <button 
                    v-for="(tab, index) in tabs" 
                    :key="index" 
                    :class="active_tab === tab ? 'active' : ''"
                    @click="active_tab = tab"
                >
                    {{ tab }}
                </button>
            </div>
            <div v-show="active_tab === tabs[0]">
                <DxDataGrid 
                    id="data-grid-dashboard"
                    key-expr="id"
                    :data-source="accountListCPOC" 
                    :selection="{ mode: 'single' }"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="false" 
                    :show-borders="true"
                    :show-row-lines="false" 
                    :row-alternation-enabled="true" 
                    @exporting="EXPORT_DATA"
                    @row-removed="DELETE_ACCOUNT"
                >
                    <DxEditing 
                        :allow-updating="false" 
                        :allow-deleting="true" 
                        :allow-adding="false" 
                        :use-icons="true"
                        mode="popup"
                        >
                        <DxPopup
                            :show-title="true"
                            :width="500"
                            :height="400"
                            title="User Info"
                        />
                        <DxForm label-location="top" :col-count="2"></DxForm>
                    </DxEditing>
                    <DxColumn 
                        data-field="username" 
                        caption="Username" 
                    />
                    <DxColumn 
                        data-field="name" 
                        caption="Full Name" 
                    />
                    <DxColumn 
                        data-field="login_last_date" 
                        caption="Last Login" 
                        data-type="date" 
                        format="dd MMM yyyy | HH:mm" 
                        alignment="center" 
                    />
                    <DxMasterDetail
                        :enabled="true"
                        template="masterDetailTemplate"
                    />
                    <template #masterDetailTemplate="{ data }">
                        <div>
                            <UserList :id_user="data.data.id" />
                        </div>
                    </template>
                    <!-- Configuration goes here -->
                    <!-- <DxFilterRow :visible="true" /> -->
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 20]"
                        :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="true" />
                </DxDataGrid>
            </div>
            <div v-show="active_tab === tabs[1]">
                <DxDataGrid 
                    id="data-grid-dashboard"
                    key-expr="id"
                    :data-source="accountListVendor" 
                    :selection="{ mode: 'single' }"
                    :hover-state-enabled="true" 
                    :allow-column-reordering="false" 
                    :show-borders="true"
                    :show-row-lines="false" 
                    :row-alternation-enabled="true" 
                    @exporting="EXPORT_DATA"
                    @row-inserted="CREATE_ACCOUNT"
                    @row-updated="UPDATE_ACCOUNT"
                    @row-removed="DELETE_ACCOUNT"
                >
                    <DxEditing 
                        :allow-updating="true" 
                        :allow-deleting="true" 
                        :allow-adding="true" 
                        :use-icons="true"
                        mode="popup"
                        >
                        <DxPopup
                            :show-title="true"
                            :width="500"
                            :height="445"
                            title="User Account"
                        />
                        <DxForm label-location="top" :col-count="2">
                            <DxItem
                                data-field="username"
                                :col-span="1"
                            />
                            <DxItem
                                data-field="password"
                                :col-span="1"
                            />
                            <DxItem
                                data-field="name"
                                :col-span="2"
                            />
                            <DxItem
                                data-field="email"
                                :col-span="2"
                            />
                            <DxItem
                                data-field="id_company"
                                :col-span="1"
                            />
                            <DxItem
                                data-field="position"
                                :col-span="1"
                            />
                        </DxForm>
                    </DxEditing>
                    <DxColumn 
                        data-field="username" 
                        caption="Username" 
                        :editor-options="{ placeholder: 'Username' }"
                    >
                        <DxRequiredRule/>
                    </DxColumn>
                    <DxColumn 
                        data-field="password" 
                        caption="Password" 
                        :visible="false"
                        :editor-options="{ placeholder: 'Password' }"
                    >
                        <DxRequiredRule/>
                    </DxColumn>
                    <DxColumn 
                        data-field="name" 
                        caption="Full Name" 
                        :editor-options="{ placeholder: 'Full Name' }"
                    >
                        <DxRequiredRule/>
                    </DxColumn>
                    <DxColumn 
                        data-field="email" 
                        caption="Email" 
                        :visible="false"
                        :editor-options="{ placeholder: 'Email' }"
                    >
                        <DxRequiredRule/>
                    </DxColumn>
                    <DxColumn data-field="id_company" caption="Company" :editor-options="{ placeholder: 'Select Company' }" :visible="false">
                        <DxLookup :data-source="companyList" display-expr="company_name" value-expr="id" />
                        <DxRequiredRule/>
                    </DxColumn>
                    <DxColumn 
                        data-field="position" 
                        caption="Position" 
                        :editor-options="{ placeholder: 'Position' }"
                        :visible="false"
                    />
                    <DxMasterDetail
                        :enabled="true"
                        template="masterDetailTemplate"
                    />
                    <template #masterDetailTemplate="{ data }">
                        <div>
                            <UserList :id_user="data.data.id" />
                        </div>
                    </template>
                    <!-- Configuration goes here -->
                    <!-- <DxFilterRow :visible="true" /> -->
                    <DxScrolling mode="standard" />
                    <DxSearchPanel :visible="true" />
                    <DxPaging :page-size="10" :page-index="0" />
                    <DxPager :show-page-size-selector="true" :allowed-page-sizes="[5, 10, 20]"
                        :show-navigation-buttons="true" :show-info="true" info-text="Page {0} of {1} ({2} items)" />
                    <DxExport :enabled="true" />
                </DxDataGrid>
            </div>
        </div>

        <popupAdd v-if="isAdd == true" @btn-cancel-add="TOGGLE_POPUP('add')" @refreshList="FETCH_LIST()" />
        <popupEdit v-if="isEdit == true" @btn-cancel-edit="TOGGLE_POPUP('edit')" @refreshList="FETCH_LIST()"
            v-bind:editInfo="editInfo" />
        <contentLoading text="Loading, please wait..." v-if="isLoading == true" color="#fc9b21" />
    </div>
</template>

<script>
//DataGrid
import "devextreme/dist/css/dx.light.css";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import { exportDataGrid } from "devextreme/excel_exporter";
import {
    DxDataGrid,
    DxSearchPanel,
    DxPaging,
    DxPager,
    DxScrolling,
    DxColumn,
    DxExport,
    DxEditing,
    DxPopup,
    DxForm,
    DxMasterDetail,
    DxLookup,
    DxRequiredRule,
} from "devextreme-vue/data-grid";
import { DxItem } from "devextreme-vue/form";

//API
import { GET_DATA, PUT_DATA, POST_DATA, DELETE_DATA } from "/axios.js";

//Pages & Structures
import toolbar from "@/components/app-structures/app-navbar-toolbar.vue";
import popupAdd from "@/views/Applications/UserAccountManager/account-add.vue";
import popupEdit from "@/views/Applications/UserAccountManager/account-edit.vue";
import contentLoading from "@/components/app-structures/app-content-loading.vue";
import UserList from "./UserList.vue"

//JS
import clone from "just-clone";
import { sha256 } from "js-sha256";

export default {
    name: "User-Account-List",
    components: {
        toolbar,
        DxDataGrid,
        DxSearchPanel,
        DxPaging,
        DxPager,
        DxScrolling,
        DxColumn,
        DxExport,
        DxEditing,
        DxPopup,
        DxForm,
        DxMasterDetail,
        DxLookup,
        contentLoading,
        popupAdd,
        popupEdit,
        UserList,
        DxRequiredRule,
        DxItem,
    },
    created() {
        this.$store.commit("CLEAR_CURRENT_CLIENT");
        this.$store.commit("UPDATE_CURRENT_INAPP", {
            name: "User Account Manager",
            icon: "/img/icon_menu/account/account.png",
        });
        if (this.$store.state.status.server == true) {
            GET_DATA(this, '/Md/get-md-user-company-list', 'companyList');
            this.FETCH_LIST();
        }
    },
    data() {
        return {
            tabs: ['CPOC', 'Vendor'],
            active_tab: 'CPOC',
            accountListCPOC: [],
            accountListVendor: [],
            companyList: [],
            isAdd: false,
            isEdit: false,
            isLoading: false,
            errorMessage: "",
            editInfo: "",
            dataGridAttributes: {
                class: "data-grid-style",
            },
        };
    },
    computed: {},
    methods: {
        EXPORT_DATA(e) {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("Clients");
            exportDataGrid({
                worksheet: worksheet,
                component: e.component,
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "Clients.xlsx"
                    );
                });
            });
            e.cancel = true;
        },
        TOGGLE_POPUP(m, data) {
            if (m == "add") {
                if (this.isAdd == true) this.isAdd = false;
                else this.isAdd = true;
            } else if (m == "edit") {
                if (this.isEdit == true) this.isEdit = false;
                else {
                    this.editInfo = clone(data.data);
                    this.isEdit = true;
                }
            }
        },
        FETCH_LIST() {
            GET_DATA(this, '/User/get-active-user-list', (data) => {
                this.accountListCPOC = data.filter(e => e.id_login_method === 1);
                this.accountListVendor = data.filter(e => e.id_login_method === 2);
            });
        },
        CREATE_ACCOUNT(e) {
            if (!this.VALIDATE_PASSWORD(e.data.password)) 
                this.$ons.notification.alert("Password must be 8 characters and contain 1 capital letter, 1 number, 1 special character.");
            
            const user = JSON.parse(localStorage.getItem("user"));
            e.data.updated_by = user.id;
            POST_DATA('/User/register-user', e.data, () => {});
        },
        UPDATE_ACCOUNT(e) {
            PUT_DATA('', e.data, () => {});
        },
        DELETE_ACCOUNT(e) {
            const user = JSON.parse(localStorage.getItem("user"));
            DELETE_DATA(`/User/inactive-user?id=${e.data.id}&updated_by=${user.id}`, () => {
                this.$ons.notification.alert("Account delete successful");
                this.FETCH_LIST();
            });
        },
        RESET_PASSWORD(row_data) {
            // console.log(row_data);
            // console.log("Reset account id: " + row_data.data.id_account);
            this.$ons.notification.confirm("Confirm password reset?").then((res) => {
                if (res == 1) {
                    let data = {
                        id_account: row_data.data.id_account,
                        password: sha256("dex0n7845"),
                    };
                    PUT_DATA('/UserAccount/edit-user-password', data, () => { 
                        this.$ons.notification.alert("Password reset successful");
                        this.FETCH_LIST();
                    });
                }
            });
        },
        VALIDATE_PASSWORD(password) {
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return regex.test(password);
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/style/main.scss";

.table-tabs-buttons {
    display: flex;
    flex-direction: row;
    gap: 5px;

    button {
        padding: 10px;
        background-color: white;
        border: solid 1px #ccc;
        font-weight: 600;
        font-size: 14px;
        transition: 1s;
        cursor: pointer;
    }

    .active {
        color: white;
        background-color: $web-theme-color-secondary;
        border: solid 1px $web-theme-color-secondary;
    }
}

.data-grid-style {
    margin-bottom: 100px;
}
</style>