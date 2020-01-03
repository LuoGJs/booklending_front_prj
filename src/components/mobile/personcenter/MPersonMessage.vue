<template>
  <div>
    <div class="showmessage">

      <el-upload
        :disabled="ismodify"
        class="avatar-uploader"
        :action="this.websiteUrl+'/moocdemo/qiniuCloud/uploadImg1'"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeUploadFiles2">
        <img v-if="user.avatar" :src="user.avatar" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p style="font-size: 12px">*友情提示：点击下方编辑资料才可以修改头像</p>
      <el-divider></el-divider>


      <div class="othermessage">
        <van-row>
          <van-col :span="8" >
            <b style="font-size: 20px;line-height: 50px"> 账&nbsp;号：</b>
          </van-col>
          <van-col :span="16">
            <el-input
              placeholder=""
              v-model="user.username"
              :disabled="ismodify">
            </el-input>
          </van-col>
        </van-row>

        <van-row>
          <van-col :span="8" >
            <b style="font-size: 20px;line-height: 50px"> 密&nbsp;码：</b>
          </van-col>
          <van-col :span="16">
            <el-input
              placeholder=""
              v-model="user.password"
              :disabled="ismodify">
            </el-input>
          </van-col>
        </van-row>


        <van-row>
          <van-col :span="8" >
            <b style="font-size: 20px;line-height: 50px"> 性别：</b>
          </van-col>
          <van-col :span="8">
            <el-select v-model="user.gender" :disabled="ismodify" placeholder="请选择性别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </van-col>
        </van-row>


        <van-row>
          <van-col :span="8" >
            <b style="font-size: 20px;line-height: 50px"> 手机号码：</b>
          </van-col>
          <van-col :span="16">
            <el-input
              placeholder=""
              v-model="user.mobile"
              :disabled="ismodify">
            </el-input>
          </van-col>
        </van-row>


        <van-row>
          <van-col :span="8" >
            <b style="font-size: 20px;line-height: 50px"> 出生日期：</b>
          </van-col>
          <van-col :span="16">
            <el-date-picker
              type="date"
              v-model="user.birthday"
              placeholder=""
              :disabled="ismodify">
            </el-date-picker>
          </van-col>
        </van-row>
      </div>

    </div>
    <el-button style="margin-top: 70px;" type="primary" icon="el-icon-edit" v-show="isdisplay" @click="modifymessage">编辑资料</el-button>
    <el-button style="margin-top: 70px;" type="primary" v-show="!isdisplay" @click="confirmmodify">确定修改</el-button>
  </div>
</template>

<script>
    export default {
        name: "MPersonMessage",
      mounted(){
        this.initmessage();
      },
      created(){

      },
      data() {
        return {
          user: {
            uid:999,
            username: '没有获取',
            password: '没有获取',
            mobile: '没有获取',
            avatar: '',
            gender:'没有获取',
            birthday: '1999-12-12',

          },
          options:[
            {
              value:"man",
              label:"男"
            },
            {
              value:"woman",
              label:"女"
            },

          ],

          ismodify: true,
          isdisplay: true,
          ismodifyavatar:false,
        }
      },

      methods: {

        initmessage:function(){

          this.user=JSON.parse(localStorage.getItem("mytoken"));
// console.log(this.user.uid)
        },

        modifymessage:function () {
          this.ismodify=false;
          this.isdisplay=false;
        },
        confirmmodify: function () {


          this.ismodify=true;
          this.isdisplay=true;
          // 这里发送axious请求
          let url = this.websiteUrl + '/moocdemo/users/update';
          let that = this;
          this.axios.patch(url,this.user)
            .then(function (response) {
              //console.log(response.data);
              if (response.data.code == 200) {

                // console.log("登录成功用户对象->" + response.data.data);
                localStorage.setItem("mytoken",JSON.stringify(that.user));

                that.$message({
                  message: response.data.msg,
                  type: 'success'
                });


              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
              }
            }).catch(function (error) {
            that.$message({
              message: '修改失败！',
              type: 'error'
            });
          });

        },


        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },

        handleAvatarSuccess(res, file) {
          this.user.avatar = res.data;

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
