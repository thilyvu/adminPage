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
            <el-table-column prop="testName" label="Test Name">
            </el-table-column>
            <el-table-column prop="testType" label="Test Type">
            </el-table-column>
            <el-table-column label="Time line" #default="scope">
              <p v-if="scope.row.startDate && scope.row.endDate">
                {{
                  `${formatDate(scope.row.startDate)} - ${formatDate(
                    scope.row.endDate
                  )}`
                }}
              </p>
            </el-table-column>
            <el-table-column prop="totalTopics" label="Total Topics">
            </el-table-column>
            <el-table-column prop="totalStudents" label="Total Submits">
            </el-table-column>
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
        title="Exercise detail "
        width="30%"
        :before-close="handleClose"
      >
        <!-- <span>Class detail</span> -->
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
        <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
          <el-form-item label="Test Name">
            <el-input v-model="sizeForm.exerciseName"></el-input>
          </el-form-item>
          <el-form-item label="Type of exams">
            <el-input v-model="sizeForm.typeOfExams"></el-input>
          </el-form-item>
          <el-form-item label="Exercise status">
            <el-checkbox
              v-model="sizeForm.isHide"
              label="Hide status"
            ></el-checkbox>
            <el-checkbox
              v-model="sizeForm.disabled"
              label="Disabled"
            ></el-checkbox>
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="sizeForm.description"></el-input>
          </el-form-item>
          <el-form-item label="Start Date">
            <el-date-picker
              v-model="sizeForm.startDate"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="End Date">
            <el-date-picker
              v-model="sizeForm.endDate"
              type="date"
              placeholder="Pick a day"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="ExamFile Url">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :file-list="[
                { name: sizeForm.fileName, url: sizeForm.examFileUrl },
              ]"
              :disabled="true"
              :thumbnail-mode="true"
            >
            </el-upload>
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
        id: "",
        disabled: false,
        examFileUrl: "",
        typeOfExams: "",
        isHide: true,
        exerciseName: "",
        description: "",
        fileExtension: "",
        startDate: new Date(),
        endDate: new Date(),
        fileName: "",
      },
      fileTypes: [
        { value: "file", lable: "file" },
        { value: "folder", lable: "folder" },
      ],
    };
  },
  async mounted() {
    this.loading = true;
    Api.get("/test", { params: { page: this.page, limit: 100 } })
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
  methods: {
    setPage(val) {
      this.page = val;
      this.loading = true;
      this.keyword !== ""
        ? Api.get("/test", {
            params: { page: this.page, limit: 100, "testName[regex]": val },
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
        : Api.get("/test", {
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
      this.exerciseId = row._id;
      this.sizeForm = {
        disabled: row.disabled,
        examFileUrl: row.examFileUrl,
        typeOfExams: row.typeOfExams,
        isHide: row.isHide,
        exerciseName: row.exerciseName,
        description: row.description,
        fileExtension: row.fileExtension,
        startDate: new Date(row.startDate),
        endDate: new Date(row.endDate),
        fileName: row.fileName,
      };
    },
    handleDelete(index, row) {
      this.exerciseId = row._id;
      ElMessageBox.confirm("Are you sure to delete this exercise?")
        .then(() => {
          this.loading_delete_btn;
          Api.delete(`/test/${this.exerciseId}`)
            .then(() => {
              this.$notify({
                type: "success",
                title: "Delete exercise",
                message: "Delete exercise successful",
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
      Api.put(`/test/${this.exerciseId}`, {
        disabled: this.sizeForm.disabled,
        examFileUrl: this.sizeForm.examFileUrl,
        typeOfExams: this.sizeForm.typeOfExams,
        isHide: this.sizeForm.isHide,
        exerciseName: this.sizeForm.exerciseName,
        description: this.sizeForm.description,
        fileExtension: this.sizeForm.fileExtension,
        startDate: new Date(this.sizeForm.startDate),
        endDate: new Date(this.sizeForm.endDate),
      })
        .then(() => {
          this.$notify({
            type: "success",
            title: "Update exercise",
            message: "Update exercise successful",
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
      Api.get("/test", { params: { page: this.page, limit: 100 } })
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
      Api.get("/test", {
        params: { page: this.page, limit: 100, "testName[regex]": val },
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
