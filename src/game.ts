//Imports
import * as utils from '@dcl/ecs-scene-utils'


//Materials
const material00 = new Material()
      material00.albedoColor = Color3.White()
      material00.metallic = 0
      material00.roughness = .5
const material01 = new Material()
      material01.albedoColor = Color3.FromHexString("#005F73")
      material01.metallic = 0
      material01.roughness = 1
const material02 = new Material()
      material02.albedoColor = Color3.FromHexString("#0A9396")
      material02.metallic = 0
      material02.roughness = 1
const material03 = new Material()
      material03.albedoColor = Color3.FromHexString("#94D2BD")
      material03.metallic = 0
      material03.roughness = 1
const material04 = new Material()
      material04.albedoColor = Color3.FromHexString("#E9D8A6")
      material04.metallic = 0
      material04.roughness = 1
const material05 = new Material()
      material05.albedoColor = Color3.FromHexString("#EE9B00")
      material05.metallic = 0
      material05.roughness = 1
const material06 = new Material()
      material06.albedoColor = Color3.FromHexString("#CA6702")
      material06.metallic = 0
      material06.roughness = 1
const material07 = new Material()
      material07.albedoColor = Color3.FromHexString("#BB3E03")
      material07.metallic = 0
      material07.roughness = 1
const material08 = new Material()
      material08.albedoColor = Color3.FromHexString("#AE2012")
      material08.metallic = 0
      material08.roughness = 1
const material09 = new Material()
      material09.albedoColor = Color3.FromHexString("#9B2226")
      material09.metallic = 0
      material09.roughness = 1
const material10 = new Material()
      material10.albedoColor = Color3.White()
      material10.metallic = 0
      material10.roughness = 1

      class ColorSystem1 {
                  fraction:number = 0
                  direction: number = 1

                  update(dt:number){
                      this.fraction += this.direction * dt * 0.25
                      if(this.fraction > 1){
                          this.fraction = 1
                          this.direction = -1

                      } else if(this.fraction < 0){
                        this.fraction = 0
                        this.direction = 1

                    }
                      material10.albedoColor = Color4.Lerp(new Color4(3, 3, 3, 1), new Color4(1.5, 1.5, 1.5, .5), this.fraction)
                  }
              }
engine.addSystem(new ColorSystem1())

//sounds
const clip = new AudioClip("sounds/button.mp3")
const click = new AudioSource(clip)

const water = new AudioClip("sounds/pond.mp3")
const pond = new AudioSource(water)


//Ground
const ground = new Entity()
ground.addComponent(new PlaneShape())
ground.addComponent(material00)
ground.addComponent(
      new Transform({
        position: new Vector3(24, 0, 24),
        scale: new Vector3(48, 48, 1),
        rotation: Quaternion.Euler(90, 90, 0)
    }))
engine.addEntity(ground)

//podium
let podium = new Entity()
let podiumPath:string = "models/gate_base.glb"
    podium.addComponent(new GLTFShape(podiumPath))
    podium.addComponent(new Transform({
        position: new Vector3(16, 0, 16),
        scale: new Vector3(1, 1, 1),
        rotation: Quaternion.Euler(0, 180, 0)
}))
engine.addEntity(podium)

//block
let block = new Entity()
block.addComponent(new SphereShape())
block.getComponent(SphereShape).withCollisions = false
block.addComponent(material10)
    block.addComponent(new Transform({
        position: new Vector3(24, 3.5, 24),
        scale: new Vector3(.5, .5, .5),
}))
engine.addEntity(block)

//State 01 - Parent
let state01 = new Entity()
state01.addComponent(
  new Transform({
    position: new Vector3(16, 0, 16)
}))
state01.addComponent(
    new utils.ToggleComponent(utils.ToggleState.On, value => {
        engine.removeEntity(state02),
        engine.removeEntity(state03),
        engine.addEntity(state01)
  })
)

                    //State Trigger 03
                    const trigger_03 = new Entity()
                    trigger_03.addComponent(new PlaneShape())
                    trigger_03.getComponent(PlaneShape).withCollisions = false
                    trigger_03.getComponent(PlaneShape).visible = false
                    trigger_03.addComponent(material00)
                    trigger_03.addComponent(click)
                    trigger_03.addComponent(new Transform({
                      position: new Vector3(8, 6.25, 8),
                      scale: new Vector3(1, 1, 1),
                      rotation: Quaternion.Euler(90, 0, 0)
                    }))
                    let triggerBox03 = new utils.TriggerBoxShape()
                    trigger_03.addComponent(
                      new utils.TriggerComponent(
                        triggerBox03,
                      {
                        onCameraExit :() => {
                          log('triggered!')
                          state02.getComponent(utils.ToggleComponent).toggle()}
                    }))
                    click.playing = true

                    // pond frame
                    let frame = new Entity()
                    let framePath:string = "models/frame.glb"
                        frame.addComponent(new GLTFShape(framePath))
                        frame.addComponent(new Transform({
                            position: new Vector3(0, 0, 0),
                            scale: new Vector3(1, 1, 1),
                            rotation: Quaternion.Euler(0, 180, 0)
                    }))

                    //link
                    let link = new Entity()
                    link.addComponent(new PlaneShape())
                    link.addComponent(material02)
                    link.getComponent(PlaneShape).withCollisions = false
                    link.addComponent(pond)
                    const transform01 = new Transform({
                      position: new Vector3(8, .5, 8),
                      scale: new Vector3(6, 6, 1),
                      rotation: Quaternion.Euler(90, 0, 0)
                    })
                    link.addComponent(transform01)
                      link.addComponent(
                        new OnPointerDown(() => {
                          openExternalURL("https://world-005.herokuapp.com/?realm=v1%7Eworld-005.herokuapp.com")
                        },
                        {
                          showFeedback: true,
                          hoverText: "link",
                        }
                      )
                    )
                    pond.playing = true
                    pond.volume = 0.1

                    //builder secnes
                    const _scene = new Entity('_scene')
                    engine.addEntity(_scene)
                    const transform = new Transform({
                      position: new Vector3(0, 0, 0),
                      rotation: new Quaternion(0, 0, 0, 1),
                      scale: new Vector3(1, 1, 1)
                    })
                    _scene.addComponentOrReplace(transform)

                              const dandelion = new Entity('dandelion')
                              engine.addEntity(dandelion)
                              dandelion.setParent(_scene)
                              const transform3 = new Transform({
                                position: new Vector3(8, 0.3906524181365967, 10.5),
                                rotation: new Quaternion(0, -0.2902846932411194, 3.4604628496026635e-8, 0.9569403529167175),
                                scale: new Vector3(1.630812644958496, 1.630812644958496, 1.630812644958496)
                              })
                              dandelion.addComponentOrReplace(transform3)
                              const gltfShape2 = new GLTFShape("models/builder/009be9a4-294f-4ff4-88b6-04d13a51af0d/Grass_04/Grass_04.glb")
                              gltfShape2.withCollisions = true
                              gltfShape2.isPointerBlocker = true
                              gltfShape2.visible = true
                              dandelion.addComponentOrReplace(gltfShape2)

                              const bigMossyRock = new Entity('bigMossyRock')
                              engine.addEntity(bigMossyRock)
                              bigMossyRock.setParent(_scene)
                              const transform4 = new Transform({
                                position: new Vector3(6.5, 0, 10.5),
                                rotation: new Quaternion(-0.6231642365455627, 0.15064986050128937, 0.1239551305770874, 0.7573678493499756),
                                scale: new Vector3(0.9267765283584595, 0.5890552997589111, 0.9841682314872742)
                              })
                              bigMossyRock.addComponentOrReplace(transform4)
                              const gltfShape3 = new GLTFShape("models/builder/7db063b0-ba2b-4211-8fd5-8f44b38d9a19/RockLargeMoss_01/RockLargeMoss_01.glb")
                              gltfShape3.withCollisions = true
                              gltfShape3.isPointerBlocker = true
                              gltfShape3.visible = true
                              bigMossyRock.addComponentOrReplace(gltfShape3)

                              const flowerSprouts = new Entity('flowerSprouts')
                              engine.addEntity(flowerSprouts)
                              flowerSprouts.setParent(_scene)
                              const transform5 = new Transform({
                                position: new Vector3(6, 0.4332089424133301, 6.5),
                                rotation: new Quaternion(0, 0, 0, 1),
                                scale: new Vector3(2.300516128540039, 2.300516128540039, 2.300516128540039)
                              })
                              flowerSprouts.addComponentOrReplace(transform5)
                              const gltfShape4 = new GLTFShape("models/builder/bf0962d5-8904-4f4a-b2b6-9f4607ba1e0d/Plant_03/Plant_03.glb")
                              gltfShape4.withCollisions = true
                              gltfShape4.isPointerBlocker = true
                              gltfShape4.visible = true
                              flowerSprouts.addComponentOrReplace(gltfShape4)

                              const evergreenShrub = new Entity('evergreenShrub')
                              engine.addEntity(evergreenShrub)
                              evergreenShrub.setParent(_scene)
                              const transform6 = new Transform({
                                position: new Vector3(7, 0.09167003631591797, 6.5),
                                rotation: new Quaternion(-6.481010127236419e-16, -0.4713967442512512, 5.6194863873315626e-8, 0.8819212913513184),
                                scale: new Vector3(1, 1, 1)
                              })
                              evergreenShrub.addComponentOrReplace(transform6)
                              const gltfShape5 = new GLTFShape("models/builder/0d4f1e28-c9bd-4f3e-9605-c76c84702742/Bush_03/Bush_03.glb")
                              gltfShape5.withCollisions = true
                              gltfShape5.isPointerBlocker = true
                              gltfShape5.visible = true
                              evergreenShrub.addComponentOrReplace(gltfShape5)

                              const dandelion2 = new Entity('dandelion2')
                              engine.addEntity(dandelion2)
                              dandelion2.setParent(_scene)
                              dandelion2.addComponentOrReplace(gltfShape2)
                              const transform7 = new Transform({
                                position: new Vector3(7, 0.3906524181365967, 7.5),
                                rotation: new Quaternion(0, 0, 0, 1),
                                scale: new Vector3(1.630812644958496, 1.630812644958496, 1.630812644958496)
                              })
                              dandelion2.addComponentOrReplace(transform7)

                              const dandelion3 = new Entity('dandelion3')
                              engine.addEntity(dandelion3)
                              dandelion3.setParent(_scene)
                              dandelion3.addComponentOrReplace(gltfShape2)
                              const transform8 = new Transform({
                                position: new Vector3(7.5, 0.3906524181365967, 7),
                                rotation: new Quaternion(-1.10062582369541e-15, -0.6343932747840881, 7.562556447737734e-8, 0.7730104327201843),
                                scale: new Vector3(1.6308127641677856, 1.359144687652588, 1.6308127641677856)
                              })
                              dandelion3.addComponentOrReplace(transform8)

                              const flowerSprouts2 = new Entity('flowerSprouts2')
                              engine.addEntity(flowerSprouts2)
                              flowerSprouts2.setParent(_scene)
                              flowerSprouts2.addComponentOrReplace(gltfShape4)
                              const transform9 = new Transform({
                                position: new Vector3(10, 0.4332089424133301, 6.5),
                                rotation: new Quaternion(0, 0, 0, 1),
                                scale: new Vector3(1.2535840272903442, 1.2535840272903442, 1.2535840272903442)
                              })
                              flowerSprouts2.addComponentOrReplace(transform9)

                              const balsamFlower = new Entity('balsamFlower')
                              engine.addEntity(balsamFlower)
                              balsamFlower.setParent(_scene)
                              const transform10 = new Transform({
                                position: new Vector3(5.912140846252441, 0.7939151525497437, 10),
                                rotation: new Quaternion(0, 0, 0, 1),
                                scale: new Vector3(1, 1, 1)
                              })
                              balsamFlower.addComponentOrReplace(transform10)
                              const gltfShape6 = new GLTFShape("models/builder/71806ca6-1a2b-4d8b-b919-ae96241f8c08/Plant_02/Plant_02.glb")
                              gltfShape6.withCollisions = true
                              gltfShape6.isPointerBlocker = true
                              gltfShape6.visible = true
                              balsamFlower.addComponentOrReplace(gltfShape6)

                              const clayPot = new Entity('clayPot')
                              engine.addEntity(clayPot)
                              clayPot.setParent(_scene)
                              const transform11 = new Transform({
                                position: new Vector3(5.931393623352051, 0.5, 10),
                                rotation: new Quaternion(0, 0, 0, 1),
                                scale: new Vector3(1, 0.5099999904632568, 1)
                              })
                              clayPot.addComponentOrReplace(transform11)
                              const gltfShape7 = new GLTFShape("models/builder/39577482-9056-4a72-9f7c-a3c544df41fe/Pot_01/Pot_01.glb")
                              gltfShape7.withCollisions = true
                              gltfShape7.isPointerBlocker = true
                              gltfShape7.visible = true
                              clayPot.addComponentOrReplace(gltfShape7)

                              const roundedMediumRock = new Entity('roundedMediumRock')
                              engine.addEntity(roundedMediumRock)
                              roundedMediumRock.setParent(_scene)
                              const transform12 = new Transform({
                                position: new Vector3(7.5, 0, 9.5),
                                rotation: new Quaternion(0.47139668464660645, -2.1880987080276186e-15, -5.619486032060195e-8, -0.8819212913513184),
                                scale: new Vector3(1, 1, 1)
                              })
                              roundedMediumRock.addComponentOrReplace(transform12)
                              const gltfShape8 = new GLTFShape("models/builder/6aa3eba3-016c-437e-826f-c2be08052551/RockMedium_02/RockMedium_02.glb")
                              gltfShape8.withCollisions = true
                              gltfShape8.isPointerBlocker = true
                              gltfShape8.visible = true
                              roundedMediumRock.addComponentOrReplace(gltfShape8)

//Set parent
trigger_03.setParent(state01)
frame.setParent(state01)
link.setParent(state01)
_scene.setParent(state01)



//State 02 - Parent
let state02 = new Entity()
state02.addComponent(
  new Transform({
    position: new Vector3(16, 0, 16)
}))
state02.addComponent(
    new utils.ToggleComponent(utils.ToggleState.On, value => {
        engine.removeEntity(state01),
        engine.removeEntity(state03),
        engine.addEntity(state02)
  })
)
                  //State Trigger 02
                  const trigger_02 = new Entity()
                  trigger_02.addComponent(new PlaneShape())
                  trigger_02.getComponent(PlaneShape).withCollisions = false
                  trigger_02.getComponent(PlaneShape).visible = false
                  trigger_02.addComponent(material00)
                  trigger_02.addComponent(click)
                  trigger_02.addComponent(new Transform({
                    position: new Vector3(8, 6.25, 8),
                    scale: new Vector3(1, 1, 1),
                    rotation: Quaternion.Euler(90, 0, 0)
                  }))
                  let triggerBox02 = new utils.TriggerBoxShape()
                  trigger_02.addComponent(
                    new utils.TriggerComponent(
                      triggerBox02,
                    {
                      onCameraExit :() => {
                        log('triggered!')
                        state03.getComponent(utils.ToggleComponent).toggle()}
                  }))
                  click.playing = true

                  //dome
                  let dome = new Entity()
                  let domePath:string = "models/gate_dome.glb"
                      dome.addComponent(new GLTFShape(domePath))
                      dome.addComponent(new Transform({
                          position: new Vector3(0, 0, 0),
                          scale: new Vector3(1, 1, 1),
                          rotation: Quaternion.Euler(0, 180, 0)
                  }))

//Set parent
trigger_02.setParent(state02)
dome.setParent(state02)

//specify start state to run. Penultimate line of code on trigger components determine starting state
engine.addEntity(state02)

//State 03 - Parent
let state03 = new Entity()
state03.addComponent(
  new Transform({
    position: new Vector3(16, 0, 16)
}))
state03.addComponent(
    new utils.ToggleComponent(utils.ToggleState.On, value => {
        engine.removeEntity(state01),
        engine.removeEntity(state02),
        engine.addEntity(state03)
  })
)

                  //State Trigger 01
                  const trigger_01 = new Entity()
                  trigger_01.addComponent(new PlaneShape())
                  trigger_01.getComponent(PlaneShape).withCollisions = false
                  trigger_01.getComponent(PlaneShape).visible = false
                  trigger_01.addComponent(material00)
                  trigger_01.addComponent(click)
                  trigger_01.addComponent(new Transform({
                    position: new Vector3(8, 6.25, 8),
                    scale: new Vector3(1, 1, 1),
                    rotation: Quaternion.Euler(90, 0, 0)
                  }))
                  let triggerBox01 = new utils.TriggerBoxShape()
                  trigger_01.addComponent(
                    new utils.TriggerComponent(
                      triggerBox01,
                    {
                      onCameraExit :() => {
                        log('triggered!')
                        state01.getComponent(utils.ToggleComponent).toggle()}
                  }))
                  click.playing = true

                  //tables
                  let tables = new Entity()
                  let tablesPath:string = "models/gate_tables.glb"
                      tables.addComponent(new GLTFShape(tablesPath))
                      tables.addComponent(new Transform({
                          position: new Vector3(0, 0, 0),
                          scale: new Vector3(1, 1, 1),
                          rotation: Quaternion.Euler(0, 180, 0)
                  }))

                  //Trigger world001
                  const world001t = new Entity()
                  world001t.addComponent(new SphereShape())
                  world001t.addComponent(material01)
                  world001t.addComponent(new Transform({
                    position: new Vector3(1.75, 2, 9.1),
                    scale: new Vector3(.5, .5, .5)
                    }))
                  world001t.addComponent(
                      new OnClick(event => {
                        state01_1.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //Trigger world002
                  const world002t = new Entity()
                  world002t.addComponent(new SphereShape())
                  world002t.addComponent(material02)
                  world002t.addComponent(new Transform({
                    position: new Vector3(3.95, 2, 12.85),
                    scale: new Vector3(.5, .5, .5)
                    }))
                  world002t.addComponent(
                      new OnClick(event => {
                        state01_2.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //Trigger world003
                  const world003t = new Entity()
                  world003t.addComponent(new SphereShape())
                  world003t.addComponent(material05)
                  world003t.addComponent(new Transform({
                    position: new Vector3(12.05, 2, 12.85),
                    scale: new Vector3(.5, .5, .5)
                    }))
                  world003t.addComponent(
                      new OnClick(event => {
                        state01_3.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //Trigger world004
                  const world004t = new Entity()
                  world004t.addComponent(new SphereShape())
                  world004t.addComponent(material06)
                  world004t.addComponent(new Transform({
                    position: new Vector3(14.25, 2, 9.1),
                    scale: new Vector3(.5, .5, .5)
                    }))
                  world004t.addComponent(
                      new OnClick(event => {
                        state01_4.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //Trigger world005
                  const world005t = new Entity()
                  world005t.addComponent(new SphereShape())
                  world005t.addComponent(material07)
                  world005t.addComponent(new Transform({
                    position: new Vector3(10.2, 2, 2.05),
                    scale: new Vector3(.5, .5, .5),
                    }))
                  world005t.addComponent(
                      new OnClick(event => {
                        state01_5.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //Trigger world006
                  const world006t = new Entity()
                  world006t.addComponent(new SphereShape())
                  world006t.addComponent(material09)
                  world006t.addComponent(new Transform({
                    position: new Vector3(5.8, 2, 2.05),
                    scale: new Vector3(.5, .5, .5),
                    }))
                  world006t.addComponent(
                      new OnClick(event => {
                        state01_6.getComponent(utils.ToggleComponent).toggle()
                      },
                      {
                        showFeedback: true,
                        hoverText: "load channel",
                      }
                    )
                  )

                  //State 01_1
                  let state01_1 = new Entity()
                  state01_1.addComponent(
                      new utils.ToggleComponent(utils.ToggleState.Off, value => {
                        engine.addEntity(state01_1)
                        engine.removeEntity(state01_2)
                        engine.removeEntity(state01_3)
                        engine.removeEntity(state01_4)
                        engine.removeEntity(state01_5)
                        engine.removeEntity(state01_6)
                    })
                  )

                  //State 01_2
                  let state01_2 = new Entity()
                  state01_2.addComponent(
                      new utils.ToggleComponent(utils.ToggleState.Off, value => {
                        engine.addEntity(state01_2)
                        engine.removeEntity(state01_1)
                        engine.removeEntity(state01_3)
                        engine.removeEntity(state01_4)
                        engine.removeEntity(state01_5)
                        engine.removeEntity(state01_6)
                    })
                  )

                            //folly
                            let folly = new Entity()
                            let follyPath:string = "models/folly.glb"
                                folly.addComponent(new GLTFShape(follyPath))
                                folly.addComponent(new Transform({
                                  position: new Vector3(0, 0, 0),
                                  scale: new Vector3(1, 1, 1),
                                  rotation: Quaternion.Euler(0, 180, 0)
                            }))

                  folly.setParent(state01_2)

                  //State 01_3
                  let state01_3 = new Entity()
                  state01_3.addComponent(
                    new utils.ToggleComponent(utils.ToggleState.Off, value => {
                      engine.addEntity(state01_3)
                      engine.removeEntity(state01_1)
                      engine.removeEntity(state01_2)
                      engine.removeEntity(state01_4)
                      engine.removeEntity(state01_5)
                      engine.removeEntity(state01_6)
                  })
                  )
                          //city
                          let jilxt = new Entity()
                          let jilxtPath:string = "models/jilxt.glb"
                              jilxt.addComponent(new GLTFShape(jilxtPath))
                              jilxt.addComponent(new Transform({
                                position: new Vector3(0, 0, 48),
                                scale: new Vector3(1, 1, 1),
                                rotation: Quaternion.Euler(0, 270, 0)
                          }))

                  jilxt.setParent(state01_3)

                  //State 01_4
                  let state01_4 = new Entity()
                  state01_4.addComponent(
                  new utils.ToggleComponent(utils.ToggleState.Off, value => {
                    engine.addEntity(state01_4)
                    engine.removeEntity(state01_1)
                    engine.removeEntity(state01_2)
                    engine.removeEntity(state01_3)
                    engine.removeEntity(state01_5)
                    engine.removeEntity(state01_6)
                  })
                  )
                          //topo
                          let topo = new Entity()
                          let topoPath:string = "models/topo.glb"
                              topo.addComponent(new GLTFShape(topoPath))
                              topo.addComponent(new Transform({
                                position: new Vector3(0, 0, 0),
                                scale: new Vector3(1, 1, 1),
                                rotation: Quaternion.Euler(0, 180, 0)
                          }))

                  topo.setParent(state01_4)

                  //State 01_5
                  let state01_5 = new Entity()
                  state01_5.addComponent(
                  new utils.ToggleComponent(utils.ToggleState.Off, value => {
                    engine.addEntity(state01_5)
                    engine.removeEntity(state01_1)
                    engine.removeEntity(state01_2)
                    engine.removeEntity(state01_3)
                    engine.removeEntity(state01_4)
                    engine.removeEntity(state01_6)
                  })
                  )
                        //cv
                        let cv = new Entity()
                        let cvPath:string = "models/cv.glb"
                            cv.addComponent(new GLTFShape(cvPath))
                            cv.addComponent(new Transform({
                              position: new Vector3(24, 0, 24),
                              scale: new Vector3(1.5, 1, 1.5),
                              rotation: Quaternion.Euler(0, 180, 0)
                        }))

                  cv.setParent(state01_5)

                  //State 01_6
                  let state01_6 = new Entity()
                  state01_6.addComponent(
                  new utils.ToggleComponent(utils.ToggleState.Off, value => {
                    engine.addEntity(state01_6)
                    engine.removeEntity(state01_1)
                    engine.removeEntity(state01_2)
                    engine.removeEntity(state01_3)
                    engine.removeEntity(state01_4)
                    engine.removeEntity(state01_5)
                  })
                  )
                          //maze single unit
                          let maze = new Entity()
                          let mazePath:string = "models/maze.glb"
                              maze.addComponent(new GLTFShape(mazePath))
                              maze.addComponent(new Transform({
                                position: new Vector3(.2, 0, .2),
                                scale: new Vector3(.99, 1, .99),
                                rotation: Quaternion.Euler(0, 180, 0)
                          }))
                  maze.setParent(state01_6)

//Set parent
trigger_01.setParent(state03)
tables.setParent(state03)
world001t.setParent(state03)
world002t.setParent(state03)
world003t.setParent(state03)
world004t.setParent(state03)
world005t.setParent(state03)
world006t.setParent(state03)
