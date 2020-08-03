<!--  -->
<template>
  <div style="padding:20px">
    {{message}}
    <van-uploader
      :after-read="afterRead"
      v-model="fileList"
      :max-count="1"
      :preview-full-image="false"
      :before-read="beforeRead"
    >
      <img src="../../public/img/front2.png" alt="" class="front">
    </van-uploader>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      fileList: [],
      uploadFile: "",
      imgQuality: 0.5
    };
  },
  components: {},
  mounted() {
    console.log(this.message);
  },
  methods: {
    beforeRead(fileObj) {
      let _this = this;
      let reader = new FileReader();
      reader.readAsDataURL(fileObj);
      return reader.onload = function(e) {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          let canvas = document.createElement("canvas"),
          context = canvas.getContext("2d"),
          imageWidth = image.width / 2,
          imageHeight = image.height / 2,
          data = "";
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          context.drawImage(image, 0, 0, imageWidth, imageHeight);
          data = canvas.toDataURL("image/jpeg");
          console.log("压缩后的图片:");
          console.log(data);
          return true
        };
      };
      // return true
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    //图片压缩
    dataURItoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: type
      });
    }
  },
  computed: {
    ...mapState({
      message: state => state.dashbord.message
    })
  },
  watch: {
    message(newM, oldM) {
      console.log(newM, oldM);
    }
  }
};
</script>
<style lang='less' scope>
.van-uploader__preview-image {
  display: block;
  width: 100% !important;
  height: 202px !important;
}
.front{
  width: 100%;
  height: 100%;
}
</style>