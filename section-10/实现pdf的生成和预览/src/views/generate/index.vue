<template>
  <div class="generate">
    <img src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg" width="777" height="555" alt="">
    <img src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg" width="777" height="555" alt="">
    <img src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg" width="777" height="555" alt="">
    <img src="https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview_jpg/19367cbcf3b03cc253455b4208074d76.jpg" width="777" height="555" alt="">
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus aliquam animi delectus deserunt dolorem ducimus eos illum impedit ipsa ipsum maxime, mollitia natus, nihil nulla odit qui velit voluptate.</div>
    <button @click="print">打印</button>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf';

export default {
  name: 'Generate',
  methods: {
    print() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
      html2canvas(document.body, {
        onrendered: function(canvas) {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;

          //一页pdf显示html页面生成的canvas高度;
          const pageHeight = contentWidth / 592.28 * 841.89;
          //未生成pdf的html页面高度
          let leftHeight = contentHeight;
          //页面偏移
          let position = 0;
          //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = 595.28;
          const imgHeight = 592.28/contentWidth * contentHeight;

          const pageData = canvas.toDataURL('image/jpeg', 1.0);

          const pdf = new JsPDF('', 'pt', 'a4');

          //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
          //当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
          } else {
            while(leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight;
              position -= 841.89;
              //避免添加空白页
              if(leftHeight > 0) {
                pdf.addPage();
              }
            }
          }

          pdf.save("file.pdf");
        },
        background:'#FFF',
        // allowTaint: false,
        useCORS:true, // 解决图片跨域问题
        // logging:true
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.generate {
  text-align: center;
}
</style>
