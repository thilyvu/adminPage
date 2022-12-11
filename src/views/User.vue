<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
      <!-- Card stats -->
      <div class="row">
        <div class="col-xl-4 col-lg-6">
          <!-- <div class="form-group mb-0">
            <base-input
              placeholder="Search"
              class="input-group-alternative"
              alternative=""
              addon-right-icon="fas fa-search"
            >
            </base-input>
          </div> -->
        </div>

        <div class="col-xl-3 col-lg-6">
          <!-- <stats-card
            title="Sales"
            type="gradient-green"
            sub-title="924"
            icon="ni ni-money-coins"
            class="mb-4 mb-xl-0"
          >
            <template v-slot:footer>
              <span class="text-danger mr-2"
                ><i class="fa fa-arrow-down"></i> 5.72%</span
              >
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card> -->
        </div>
        <div class="col-xl-4 col-lg-6">
          <div class="form-group mb-0">
            <el-input
              placeholder="Search"
              v-model="keyword"
              @change="handleSearch"
            >
            </el-input>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <!-- disabled: false,
        examFileUrl: "",
        typeOfExams: "",
        isHide: true,
        exerciseName: "",
        description: "",
        fileExtension: "",
        startDate: new Date(),
        endDate: new Date(),
        fileName: "", -->
          <!-- <projects-table title="Light Table"></projects-table> -->
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%; padding: 1rem"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="name" label="Full Name"> </el-table-column>
            <el-table-column prop="email" label="Email"> </el-table-column>
            <el-table-column prop="phone" label="Phone"> </el-table-column>
            <el-table-column label="DOB" #default="scope">
              <p v-if="scope.row.DOB">
                {{ `${formatDate(scope.row.DOB)} ` }}
              </p>
            </el-table-column>
            <el-table-column prop="role" label="Role"> </el-table-column>
            <el-table-column align="center">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)"
                  >Edit</el-button
                >
                <el-button
                  size="mini"
                  type="danger"
                  v-loading="loading_delete_btn"
                  @click="handleDelete(scope.$index, scope.row)"
                  >Delete</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            style="margin-bottom: 5rem; position: absolute; right: 0"
            layout="prev, pager, next"
            :total="total"
            @current-change="setPage"
          >
          </el-pagination>
          <div style="height: 10rem"></div>
        </div>
      </div>
      <el-dialog
        v-model="dialogVisible"
        title="User detail "
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span>Class detail</span> -->
        <!-- disabled: false,
         DOB: null,
        avatar: "",
        email: "",
        gender: "",
        name: "",
        phone: "",
        province: "",
        role: "",
        school: "",
        username: "",
        id: "", -->
        <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
          <el-form-item label="Name">
            <el-input v-model="sizeForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Gender">
            <el-select
              v-model="sizeForm.gender"
              placeholder="Select your gender"
            >
              <el-option
                v-for="item in genders"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="phone">
            <el-input v-model="sizeForm.school"></el-input>
          </el-form-item>
          <el-form-item label="school">
            <el-input v-model="sizeForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="Province">
            <el-select
              v-model="sizeForm.province"
              placeholder="Select your province"
            >
              <el-option
                v-for="item in province"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Role">
            <el-select
              v-model="sizeForm.role"
              placeholder="Select your province"
            >
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="email">
            <el-input v-model="sizeForm.email"></el-input>
          </el-form-item>
          <el-form-item label="Date of birth">
            <el-date-picker
              v-model="sizeForm.DOB"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Avatar image">
            <el-image :src="sizeForm.avatar"></el-image>
          </el-form-item>
          <el-form-item size="large">
            <el-button
              v-loading="loading_save_btn"
              type="primary"
              @click="onSubmit"
              >Save</el-button
            >
            <el-button @click="dialogVisible = false">Cancel</el-button>
          </el-form-item>
        </el-form>

        <!-- <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >Save</el-button
            >
          </span>
        </template> -->
      </el-dialog>
      <!-- <div class="row mt-5">
        <div class="col">
          <projects-table type="dark" title="Dark Table"></projects-table>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
// import ProjectsTable from "./Tables/ProjectsTable";
import Api from "../models/api";
import axios from "axios";
import { ElMessageBox } from "element-plus";
export default {
  name: "tables",
  data() {
    return {
      tableData: [],
      loading: false,
      loading_select: false,
      loading_save_btn: false,
      loading_delete_btn: false,
      total: 0,
      page: 1,
      keyword: "",
      dialogVisible: false,
      province: [],
      subject: [],
      grade: [],
      classId: "",
      sizeForm: {
        DOB: null,
        avatar: "",
        email: "",
        gender: "",
        name: "",
        phone: "",
        province: "",
        role: "",
        school: "",
        username: "",
        id: "",
      },
      fileTypes: [
        { value: "file", lable: "file" },
        { value: "folder", lable: "folder" },
      ],
      genders: [
        { value: "male", lable: "male" },
        { value: "female", lable: "female" },
      ],
      roles: [
        { value: "Student", lable: "Student" },
        { value: "Teacher", lable: "Teacher" },
        { value: "Admin", lable: "Admin" },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    Api.get("/getListUsers", { params: { page: this.page, limit: 100 } })
      .then((res) => {
        this.tableData = res.data.data;
        this.loading = false;
        this.total = res.data.total;
      })
      .catch((err) => {
        this.loading = false;
        this.$notify({
          type: "warning",
          title: "error",
          message: err.toString(),
        });
      });
    axios
      .get("https://provinces.open-api.vn/api/", {
        params: { depth: 1 },
      })
      .then((response) =>
        response.data.forEach((element) => {
          this.province.push({
            value: element.name,
            label: element.name,
          });
        })
      );
  },
  methods: {
    setPage(val) {
      this.page = val;
      this.loading = true;
      this.keyword !== ""
        ? Api.get("/getListUsers", {
            params: { page: this.page, limit: 100, "name[regex]": val },
          })
            .then((res) => {
              this.tableData = res.data.data;
              this.loading = false;
              this.total = res.data.total;
            })
            .catch((err) => {
              this.loading = false;
              this.$notify({
                type: "warning",
                title: "error",
                message: err.toString(),
              });
            })
        : Api.get("/getListUsers", {
            params: { page: this.page, limit: 100 },
          })
            .then((res) => {
              this.tableData = res.data.data;
              this.loading = false;
              this.total = res.data.total;
            })
            .catch((err) => {
              this.loading = false;
              this.$notify({
                type: "warning",
                title: "error",
                message: err.toString(),
              });
            });
    },
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.userId = row._id;
      this.sizeForm = {
        DOB: row.DOB,
        avatar: row.avatar,
        email: row.email,
        gender: row.gender,
        name: row.name,
        phone: row.phone,
        province: row.province,
        role: row.role,
        school: row.school,
      };
    },
    handleDelete(index, row) {
      this.userId = row._id;
      ElMessageBox.confirm("Are you sure to delete this user?")
        .then(() => {
          this.loading_delete_btn;
          Api.delete(`users/deleteUser/${this.userId}`)
            .then(() => {
              this.$notify({
                type: "success",
                title: "Delete user",
                message: "Delete user successful",
              });
              this.loading_delete_btn = false;
              this.handleClose();
            })
            .catch((err) => {
              this.loading = false;
              this.loading_delete_btn = false;
              this.$notify({
                type: "warning",
                title: "error",
                message: err.toString(),
              });
            });
        })
        .catch(() => {
          // this.$notify({
          //   type: "warning",
          //   title: "error",
          //   message: err.toString(),
          // });
        });
    },
    onSubmit() {
      this.loading_save_btn = true;
      this.sizeForm.avatar
        ? Api.put(`/users/update-profile/${this.userId}`, {
            DOB: this.sizeForm.DOB,
            gender: this.sizeForm.gender,
            name: this.sizeForm.name,
            avatar: this.sizeForm.avatar,
            phone: this.sizeForm.phone,
            province: this.sizeForm.province,
            role: this.sizeForm.role,
            school: this.sizeForm.school,
          })
            .then(() => {
              this.$notify({
                type: "success",
                title: "Update user",
                message: "Update user successful",
              });
              this.loading_save_btn = false;
              this.handleClose();
            })
            .catch((err) => {
              this.loading = false;
              this.loading_save_btn = false;
              this.$notify({
                type: "warning",
                title: "error",
                message: err.toString(),
              });
            })
        : Api.put(`/users/update-profile/${this.userId}`, {
            DOB: this.sizeForm.DOB,
            gender: this.sizeForm.gender,
            name: this.sizeForm.name,
            phone: this.sizeForm.phone,
            province: this.sizeForm.province,
            role: this.sizeForm.role,
            school: this.sizeForm.school,
          })
            .then(() => {
              this.$notify({
                type: "success",
                title: "Update user",
                message: "Update user successful",
              });
              this.loading_save_btn = false;
              this.handleClose();
            })
            .catch((err) => {
              this.loading = false;
              this.loading_save_btn = false;
              this.$notify({
                type: "warning",
                title: "error",
                message: err.toString(),
              });
            });
    },
    handleClose() {
      this.loading = true;
      Api.get("/getListUsers", { params: { page: this.page, limit: 100 } })
        .then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
          this.total = res.data.total;
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            type: "warning",
            title: "error",
            message: err.toString(),
          });
        });
      this.dialogVisible = false;
    },
    formatDate(date) {
      const newDate = new Date(date);
      var year = newDate.getFullYear(),
        month = newDate.getMonth() + 1, // months are zero indexed
        day = newDate.getDate();

      return day + "/" + month + "/" + year;
    },
    handleSearch(val) {
      this.loading = true;
      Api.get("/getListUsers", {
        params: { page: this.page, limit: 100, "name[regex]": val },
      })
        .then((res) => {
          this.tableData = res.data.data;
          this.loading = false;
          this.total = res.data.total;
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            type: "warning",
            title: "error",
            message: err.toString(),
          });
        });
      this.dialogVisible = false;
    },
  },
};
</script>
<style></style>
