import { ref, onMounted, onUnmounted, onUpdated, inject, getCurrentInstance } from 'vue'

import * as ActVsg from '../110.shade/01.visage.unit/visage.action'
import * as ActFce from '../110.shade/02.surface.unit/surface.action'
import * as ActCan from '../110.shade/03.container.unit/container.action'
import * as ActTxt from '../110.shade/05.text.unit/text.action'
import * as ActGph from '../110.shade/04.graphic.unit/graphic.action'
import * as ActSpr from '../110.shade/06.sprite.unit/sprite.action'
import * as ActHex from '../110.shade/07.hexagon.unit/hexagon.action'
import * as ActFcg from '../110.shade/08.focigon.unit/focigon.action'
import * as ActCam from '../110.shade/13.camera.unit/camera.action'

import * as ActMap from '../002.space/03.hexmap.unit/hexmap.action'

export type HelloWorld = string | number

export const mount = async (value: HelloWorld) => {
  console.log('sampleFunc:: ', value)

  const instance = getCurrentInstance();
  const SHADE = inject('SHADE')
  const SPACE = inject('SPACE')

  var bit = await SHADE['hunt'](ActVsg.MOUNT_VISAGE, { idx: "vsg00", src: "indexCanvas", dat: {  height: 320 } });
  instance?.proxy?.$forceUpdate();

  return value
}

export const update = async (value: HelloWorld) => {
  console.log('sampleFunc:: ', value)

  const instance = getCurrentInstance();
  const SHADE = inject('SHADE')
  const SPACE = inject('SPACE')

  var bit = await SHADE['hunt'](ActVsg.REMOVE_VISAGE, { idx: "vsg00" })
  bit = await SHADE['hunt'](ActVsg.MOUNT_VISAGE, { idx: "vsg00", src: "indexCanvas", dat: { height: 320 } })

  bit = await SHADE['hunt'](ActVsg.READ_VISAGE, { idx: "vsg00" })

  bit = await SHADE['hunt'](ActCan.WRITE_CONTAINER, { idx: "can00", src: 'vsg00' })
  var container = bit.canBit.dat.bit

  bit = await SHADE['hunt'](ActCan.SURFACE_CONTAINER, { idx: 'fce-can-00', src: "vsg00" });

  bit = await SHADE['hunt'](ActCan.ADD_CONTAINER, { idx: "fce-can-00", dat: { bit: container } })

  bit = await SHADE['hunt']( ActTxt.WRITE_TEXT, { idx:'txt00', dat: {  txt: "the grid" }  })
  bit = await SHADE['hunt']( ActCan.ADD_CONTAINER, { idx: "can00",  dat:{bit:bit.txtBit.dat.bit }})

  //bit = await SHADE['hunt']( ActTxt.WRITE_TEXT, { idx:'txt01', dat: {  txt: "text 01", y:15 }  })
  //bit = await SHADE['hunt']( ActCan.ADD_CONTAINER, { idx: "can00",  dat:{bit:bit.txtBit.dat.bit }})

  //bit = await SHADE['hunt']( ActTxt.WRITE_TEXT, { idx:'txt02', dat: {  txt: "text 02", y:30 }  })
  //bit = await SHADE['hunt']( ActCan.ADD_CONTAINER, { idx: "can00",  dat:{bit:bit.txtBit.dat.bit }})

  //bit = await SHADE['hunt']( ActTxt.WRITE_TEXT, { idx:'txt03', dat: {  txt: "text 03", y:45 }  })
  //bit = await SHADE['hunt']( ActCan.ADD_CONTAINER, { idx: "can00",  dat:{bit:bit.txtBit.dat.bit }})

  //bit = await SHADE['hunt']( ActSpr.WRITE_SPRITE, { idx:'spr00', dat: { src:'./img/000.png',  x:40, y:80 }  })
  //bit = await SHADE['hunt']( ActCan.ADD_CONTAINER, { idx: "can00",  dat:{bit:bit.sprBit.dat.bit }})

  bit = await SHADE['hunt'](ActGph.WRITE_GRAPHIC, { idx: 'gph00', dat: { h: 100, w: 40, x: 40, y: 40 } })
  bit = await SHADE['hunt'](ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

  bit = await SHADE['hunt'](ActGph.WRITE_GRAPHIC, { idx: 'gph01', dat: { h: 100, w: 40, x: 40, y: 40 } })
  bit = await SHADE['hunt'](ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

  bit = await SHADE['hunt'](ActGph.WRITE_GRAPHIC, { idx: 'gph02', dat: { h: 100, w: 40, x: 40, y: 40 } })
  bit = await SHADE['hunt'](ActCan.ADD_CONTAINER, { idx: "can00", dat: { bit: bit.gphBit.dat.bit } })

  //var bit = await window['electronAPI'].openGame()
  //console.log(JSON.stringify(bit))

  //var bit = await window['electronAPI'].readHexmap('map00')
  //var puff = JSON.parse(bit)

  var w = window.screen.width;

  bit = await SPACE['hunt'](ActMap.WRITE_HEXMAP, { idx:'000' })
  debugger

  var map = bit.mapBit.dat.grid
  bit = await SHADE['hunt'](ActHex.WRITE_HEXAGON, { idx: 'hex00', dat: { src: 'gph00', frm: 'hexmap', sze: 111, bit: map } })

  //var bit = await window['electronAPI'].listFocus('avas')
  //var toot = JSON.parse(bit)
  //var list = toot.focBit.lst

  //list.forEach(async (a, b) => {
  //  var focus = a;
  //  console.log("po " + a.idx)
   // bit = await SHADE['hunt'](ActFcg.WRITE_FOCIGON, { idx: focus.idx, dat: { src: 'gph01', clr: 0x0FF000, sze: 111, fce: focus.face, bit: focus } })

   // var graphic = bit.fcgBit.dat.bit

    //bit = await SHADE['hunt'](ActCam.WRITE_CAMERA, { idx: 'cam00', src: 'vsg00', dat: { x: focus.x, y: focus.y, can: container, bit: graphic } })

  //})


  bit = await SHADE['hunt'](ActFce.EXTRACT_SURFACE, { idx: 'vsg00' })

  setTimeout( async ()=>{

    //console.log("unmounted..")
  //var bit = await SHADE['hunt'](ActVsg.REMOVE_VISAGE, { idx: "vsg00" })
  }, 3333)

  return value
}

export const unmount = async (value: HelloWorld) => {
  console.log('sampleFunc:: ', value)

  const instance = getCurrentInstance();
  const SHADE = inject('SHADE')

  console.log("unmounted..")
  var bit = await SHADE['hunt'](ActVsg.REMOVE_VISAGE, { idx: "vsg00" })

  return value
}

export type Shade<Type> = {
  hunt: Function;
} & Type

