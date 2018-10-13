<template>
  <div id="labelManage">
    <div id="main">
        <div class="flowchart-demo" id="flowchart-demo">
            <div class="window" id="flowchartWindow1">一
            </div>
            <div class="window" id="flowchartWindow2">二
            </div>
            <div class="window" id="flowchartWindow3">三
            </div>
            <div class="window" id="flowchartWindow4">四
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import jsPlumb from 'jsplumb'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted () {
    jsPlumb.ready(function() {
          var j = jsPlumb.getInstance({
            DragOptions: { cursor: 'pointer', zIndex: 2000 },
            PaintStyle: { stroke: 'red', strokeWidth: 3 },  //配置自己拖拽小点的时候连接线的默认样式
            Endpoint: ["Dot", {radius: 5}], //这个是控制连线终端那个小点的半径
            // EndpointStyle : { fill : "red" }, //这个是控制连线终端那个小点的样式
            // EndpointHoverStyle  : { fill : "blue" }, //这个是控制连线终端那个小点的样式
            Connector: ["Flowchart",{curviness:70}],
            ConnectionOverlays: [
                [ "Arrow", { location: 1 } ],
                [ "Label", {
                    location: 0.5,
                    label: "hehe",
                    id: "label",
                    cssClass: "aLabel"
                }]
            ],
            Container:"flowchart-demo"
          });

          j.draggable($('.window'));
          j.addEndpoint('flowchartWindow1',{uuid:1 , anchor: "TopCenter",  isSource:true});
          j.addEndpoint('flowchartWindow2',{uuid:2 ,anchor:'Right', isTarget:true});
          j.addEndpoint('flowchartWindow3',{anthors:'Right', isTarget:true});
          // let line = j.connect({uuids: ["1", "2"], editable: true})
          j.connect({
            uuids:[1,2],  //根据uuid进行连接
            paintStyle: { stroke: 'red', strokeWidth: 3 },  //线的样式
            endpointStyle: { fill: 'blue', outlineStroke: 'darkgray', outlineWidth: 2 },//点的样式
            overlays: [ ['Arrow', { width: 12, length: 12, location: 0.5 }] ]   //覆盖物 箭头 及 样式
          })

        });

      
  }
}
</script>

<style scoped>
.flowchart-demo {
    width: 800px;
    height: 600px;
    border: 1px solid #000;
    position: relative;
}
.flowchart-demo .window {
    border: 1px solid #346789;
    box-shadow: 2px 2px 19px #aaa;
    -o-box-shadow: 2px 2px 19px #aaa;
    -webkit-box-shadow: 2px 2px 19px #aaa;
    -moz-box-shadow: 2px 2px 19px #aaa;
    -moz-border-radius: 0.5em;
    border-radius: 0.5em;
    opacity: 0.8;
    filter: alpha(opacity=80);
    text-align: center;
    position: absolute;
    background-color: #eeeeef;
    color: black;
    font-family: helvetica;
    font-size: 0.9em;
    line-height: 60px;
    width: 60px;
    height: 60px;
}
.flowchart-demo .window:hover {
    box-shadow: 2px 2px 19px #444;
    -o-box-shadow: 2px 2px 19px #444;
    -webkit-box-shadow: 2px 2px 19px #444;
    -moz-box-shadow: 2px 2px 19px #444;
    opacity: 0.6;
    filter: alpha(opacity=60);
}
.flowchart-demo .active {
    border: 1px dotted green;
}
.flowchart-demo .hover {
    border: 1px dotted red;
}
p{
  display: flex;
}
</style>
