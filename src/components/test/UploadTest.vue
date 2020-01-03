<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8" :offset="8"
              style="border:1px solid #aaa;border-radius: 10px;padding:20px 20px;display: inline-block;">
        <div>
          文件上传案例<br><br>
        </div>
        <el-upload

          name="file"
          :action="this.websiteUrl+'/moocdemo/commons/upload'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
           multiple
          :limit="3"
          :on-exceed="handleExceed"
          :before-upload="beforeUploadFiles"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">能上传任意文件，且不超过5M</div>
        </el-upload>

        <br>
        <br>
        <el-upload
          class="avatar-uploader"
          name="file"
          :action="this.websiteUrl+'/moocdemo/commons/upload'"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUploadFiles2"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "UploadTest",

    data() {
      return {
        fileList: [],
        imageUrl: ''
      }
    },

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeUploadFiles(file) {
        //const isJPG = file.type === 'image/jpeg';
        const isLt5M = file.size / 1024 / 1024 < 5;

        /*
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }*/

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M;
      },
      beforeUploadFiles2(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';

        const isLt5M = file.size / 1024 / 1024 < 5;


        if ( !(isJPG || isPNG || isBMP)) {
          this.$message.error('上传头像图片只能是图片格式!');

        }

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M && (isJPG || isPNG || isBMP);
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
