import React from 'react';
import './App.css';
import GGEditor, {
  Flow, Item, ItemPanel, Command, Toolbar, DetailPanel,
  NodePanel,
  EdgePanel,
  GroupPanel,
  MultiPanel,
  CanvasPanel,

} from 'gg-editor';
import ShellScriptStepEditor from './my/editor/steps/ShellScriptStepEditor'
import idgen from './my/service/IdGenerator'
import SavesButten from './my/component/PropsButten'
import pipelineStore from './my/service/PipelineStore'
import {convertInternalModelToJson,convertJsonToPipeline} from './my/service/PipelineSyntaxConverter'

function getNewStep() {
  return {
    id: idgen.next(),
    isContainer: true,
    children: [],
    name: "defaultName",
    label: "defaultLabel",
    data: {},
  };
}
class App extends React.Component {


  render() {
    const data = {
      nodes: [{
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '起止节点',
        x: 55,
        y: 55,
        id: 'ea1184e8',
        index: 0,
      }, {
        type: 'node',
        size: '70*70',
        shape: 'flow-circle',
        color: '#FA8C16',
        label: '结束节点',
        x: 55,
        y: 255,
        id: '481fbb1a',
        index: 2,
      }],
      edges: [{
        source: 'ea1184e8',
        sourceAnchor: 2,
        target: '481fbb1a',
        targetAnchor: 0,
        id: '7989ac70',
        index: 1,
        myProp: {}
      }],
    };
    let graph = {
      container: 'mountNode',
      width: 1300,
      height: 800,
    };
    let grid = {
      cell: 1
    }
    return <div className="App">
      <GGEditor className="GGEditor">
        <Toolbar className="Toolbar">
          <Command name="clear" className="item">清空画布</Command>
          <Command name="selectAll" className="item">全选</Command>
          <Command name="undo" className="item">撤销</Command>
          <Command name="redo" className="item">重做</Command>
          <Command name="delete" className="item">删除</Command>
          <Command name="zoomIn" className="item">放大</Command>
          <Command name="zoomOut" className="item">缩小</Command>
          <Command name="autoZoom" className="item">自适应尺寸</Command>
          <Command name="resetZoom" className="item">实际尺寸</Command>
          <Command name="toFront" className="item">提升层级</Command>
          <Command name="toBack" className="item">下降层级</Command>
          <Command name="copy" className="item">复制</Command>
          <Command name="paste" className="item">粘贴</Command>
          <Command name="multiSelect" className="item">多选模式</Command>
          <Command name="addGroup" className="item">成组</Command>
          <Command name="unGroup" className="item">取消组</Command>
          <Command name="append" className="item">添加相邻节点</Command>
          <Command name="appendChild" className="item">添加子节点</Command>
          <SavesButten text="保存" resolveData={
            (data)=>{console.log("保存:" + JSON.stringify(data));
                pipelineStore.setPipeline({
                    agent: { type: 'any' },
                    children: [],
                });
                console.log("pipeline:"+JSON.stringify(pipelineStore.pipeline));

                let defaultStage= pipelineStore.createSequentialStage("firstStage");
                console.log("pipeline:"+JSON.stringify(pipelineStore.pipeline));

                pipelineStore.addStep(defaultStage,null,{
                    functionName:"functionName1",
                    displayName:"displayName"
                });
                console.log("pipeline:"+JSON.stringify(pipelineStore.pipeline));
                console.log("convertInternalModelToJson:"+convertInternalModelToJson(pipelineStore.pipeline));
                let pipelineJsonObject=convertInternalModelToJson(pipelineStore.pipeline);
                console.log("pipelineJsonObject json:"+JSON.stringify(pipelineJsonObject));
            }

          }/>
        </Toolbar>
        <ItemPanel className="ItemPanel">
          <Item
              type="node"
              size="72*72"
              shape="flow-circle"
              src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
              model={{
                color: '#FA8C16',
                label: '起始节点',
              }}
          />
          <Item
              type="node"
              size="72*72"
              shape="flow-circle"
              model={{
                color: '#FA8C16',
                label: '结束节点',
              }}
              src="http://prr2i4muo.bkt.clouddn.com/image/gg-editor/ZnPxbVjKYADMYxkTQXRi.svg"
          />
          <Item
              type="node"
              size="72*72"
              shape="flow-circle"
              model={{
                color: '#FA8C16',
                label: 'shellScript',
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
          />
          <Item
              type="node"
              size="72*72"
              shape="flow-circle"
              model={{
                color: '#FA8C16',
                label: 'printMessage',
              }}
              src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
          />
        </ItemPanel>
        <Flow data={data} graph={graph} grid={grid}
              onClick={(e) => {
                console.log("点击画布");
                console.log(e);
              }}
              getSelected={(e) => {
                console.log("点击选中" + e)
              }}
              onNodeClick={(e) => {
                console.log("点击节点")
                console.log(e.item.model);
              }}
              onEdgeClick={(e) => {
                console.log("点击边线");
                console.log(e);
              }}
              onAnchorDragStart={(e) => {
                console.log("鼠标开始拖拽事件\n\n");
                // console.log(e);
              }}
              onAnchorDrag={(e) => {
                console.log("鼠标拖拽事件\n");
                // console.log(e);
              }}
              onAnchorDragEnd={(e) => {
                console.log("鼠标拖拽结束事件");
                // console.log(e);
              }}
              onAnchorDragEnter={(e) => {
                console.log("鼠标拖拽进入事件");
                // console.log(e);
              }}
              onAnchorDragLeave={(e) => {
                console.log("鼠标拖拽移出事件");
                // console.log(e);
              }}
              onAnchorDrop={(e) => {
                console.log("鼠标拖拽放置事件");
                console.log(e);
                console.log(
                    "action:" + e.action,
                    "item:" + e.item,
                    "shape:" + e.shape,
                    "x:" + e.x,
                    "y:" + e.y,
                    "domX:" + e.domX,
                    "domY:" + e.domY,
                    "domEvent:" + e.domEvent,
                    "currentItem:" + e.currentItem,
                    "currentShape:" + e.currentShape,
                    "toShape:" + e.toShape,
                    "toItem:" + e.toItem
                )
              }}
              onGroupClick={(e) => {
                console.log("点击群组");
                console.log(e);
              }}
              onGuideClick={(e) => {
                console.log("点击导引");
                console.log(e);
              }}
              onAnchorClick={(e) => {
                console.log("点击锚点");
                console.log(e);
              }}/>
        <DetailPanel>

          <NodePanel>
            <ShellScriptStepEditor step={getNewStep()}
                              onChange={step => {
                                console.log("修改后的step：" + JSON.stringify(step.data));
                              }
                              }/>
          </NodePanel>

          <EdgePanel>
            {/* <EdgeDetail /> */}
          </EdgePanel>

          <GroupPanel>
            {/* <GroupDetail /> */}
          </GroupPanel>

          <MultiPanel>
            {/* <MultiDetail /> */}
          </MultiPanel>

          <CanvasPanel>
            {/* <CanvasDetail /> */}
          </CanvasPanel>

        </DetailPanel>
      </GGEditor>
    </div>
  }
}

export default App;
