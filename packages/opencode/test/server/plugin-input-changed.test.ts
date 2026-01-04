import { describe, expect, test } from "bun:test"
import path from "path"
import { Instance } from "../../src/project/instance"
import { Server } from "../../src/server/server"
import { Log } from "../../src/util/log"

const projectRoot = path.join(__dirname, "../..")
Log.init({ print: false })

describe("/plugin/input-changed", () => {
  test("returns success with mode object when called with valid input", async () => {
    await Instance.provide({
      directory: projectRoot,
      fn: async () => {
        // #given
        const app = Server.App()

        // #when
        const response = await app.request("/plugin/input-changed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionID: "test-session", text: "git status", currentMode: "normal" }),
        })

        // #then
        expect(response.status).toBe(200)
        const result = await response.json()
        expect(typeof result).toBe("object")
      },
    })
  })

  test("returns 400 when sessionID is missing", async () => {
    await Instance.provide({
      directory: projectRoot,
      fn: async () => {
        // #given
        const app = Server.App()

        // #when
        const response = await app.request("/plugin/input-changed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: "git status", currentMode: "normal" }),
        })

        // #then
        expect(response.status).toBe(400)
      },
    })
  })

  test("returns 400 when text is missing", async () => {
    await Instance.provide({
      directory: projectRoot,
      fn: async () => {
        // #given
        const app = Server.App()

        // #when
        const response = await app.request("/plugin/input-changed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionID: "test-session", currentMode: "normal" }),
        })

        // #then
        expect(response.status).toBe(400)
      },
    })
  })

  test("returns 400 when currentMode is missing", async () => {
    await Instance.provide({
      directory: projectRoot,
      fn: async () => {
        // #given
        const app = Server.App()

        // #when
        const response = await app.request("/plugin/input-changed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionID: "test-session", text: "git status" }),
        })

        // #then
        expect(response.status).toBe(400)
      },
    })
  })

  test("returns 400 when currentMode is invalid", async () => {
    await Instance.provide({
      directory: projectRoot,
      fn: async () => {
        // #given
        const app = Server.App()

        // #when
        const response = await app.request("/plugin/input-changed", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionID: "test-session", text: "git status", currentMode: "invalid" }),
        })

        // #then
        expect(response.status).toBe(400)
      },
    })
  })
})
