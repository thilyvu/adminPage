<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
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
          <!-- <projects-table title="Light Table"></projects-table> -->
          <el-table
            v-loading="loading"
            :data="tableData"
            stripe
            style="width: 100%; padding: 1rem"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="content" label="Content"> </el-table-column>
            <el-table-column prop="content" label="Content"> </el-table-column>
            <el-table-column prop="content" label="Content"> </el-table-column>
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
        title="Comment detail "
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span>Class detail</span> -->
        <el-form ref="form" :model="sizeForm" label-width="130px" size="mini">
          <el-form-item label="Comment content">
            <el-input v-model="sizeForm.content"></el-input>
          </el-form-item>
          <el-form-item label="Creator">
            <div style="display: flex">
              <span class="avatar avatar-sm rounded-circle">
                <img
                  v-if="sizeForm.createAvatar"
                  alt="Image placeholder"
                  :src="sizeForm.createAvatar"
                />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span
                  v-if="sizeForm.createName"
                  class="mb-0 text-sm font-weight-bold"
                  >{{ sizeForm.createName }}</span
                >
              </div>
            </div>
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
      dialogVisible: false,
      province: [],
      subject: [],
      grade: [],
      calendarId: "",
      keyword: "",
      sizeForm: {
        id: "",
        name: "",
        classId: "",
        color: "",
        description: "",
        endTime: "",
        startTime: "",
      },
    };
  },
  async mounted() {
    this.loading = true;
    Api.get("/comment", { params: { page: this.page, limit: 100 } })
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

    Api.get("/subject", { params: { limit: 100 } })
      .then((res) => {
        res.data.data.forEach((element) => {
          this.subject.push({
            value: element.name,
            label: element.name,
          });
        });
        // this.subject = res.data.data;
        this.loading_select = false;
        // this.total = res.data.total;
      })
      .catch((err) => {
        this.loading_select = false;
        this.$notify({
          type: "warning",
          title: "error",
          message: err.toString(),
        });
      });
    Api.get("/grade", { params: { limit: 100 } })
      .then((res) => {
        res.data.data.forEach((element) => {
          this.grade.push({
            value: element.name,
            label: element.name,
          });
        });
        this.loading_select = false;
        this.total = res.data.total;
      })
      .catch((err) => {
        this.loading_select = false;
        this.$notify({
          type: "warning",
          title: "error",
          message: err.toString(),
        });
      });
  },
  methods: {
    setPage(val) {
      this.page = val;
      this.loading = true;
      this.keyword !== ""
        ? Api.get("/allCalendar", {
            params: {
              page: this.page,
              limit: 100,
              "name[regex]": this.keyword,
            },
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
        : Api.get("/allCalendar", { params: { page: this.page, limit: 100 } })
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
    handleSearch(val) {
      this.loading = true;
      Api.get("/allCalendar", {
        params: { page: this.page, limit: 100, "content[regex]": val },
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
    handleEdit(index, row) {
      this.dialogVisible = true;
      this.calendarId = row._id;
      this.sizeForm = {
        content: row.content,
        createAvatar: row.createAvatar,
        createName: row.createName,
      };
    },
    handleDelete(index, row) {
      this.calendarId = row._id;
      ElMessageBox.confirm("Are you sure to delete this calendar?")
        .then(() => {
          this.loading_delete_btn;
          Api.delete(`/calendar/${this.calendarId}`)
            .then(() => {
              this.$notify({
                type: "success",
                title: "Delete calendar",
                message: "Delete calendar successful",
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
      Api.put(`/calendar/${this.calendarId}`, {
        content: this.sizeForm.content,
        image: this.sizeForm.image,
      })
        .then(() => {
          this.$notify({
            type: "success",
            title: "Update calendar",
            message: "Update calendar successful",
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
      Api.get("/allCalendar", { params: { page: this.page, limit: 100 } })
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
<style>
.el-input--mini .el-input__inner {
  width: 200px;
}

.el-textarea__inner {
  width: 200px !important;
}
</style>
