import ne from "velocity-animate";
import { openBlock as y, createBlock as O, TransitionGroup as Y, withCtx as S, renderSlot as C, computed as d, ref as R, onMounted as oe, onUnmounted as ie, createElementBlock as T, normalizeStyle as G, resolveDynamicComponent as se, Fragment as ae, renderList as re, normalizeClass as I, createElementVNode as M, createCommentVNode as le } from "vue";
class ce {
  constructor() {
    this.events = {};
  }
  /**
   * Registers an event listener for a specific event.
   * @param {string} eventName - The name of the event.
   * @param {Function} callback - The callback function to execute when the event is fired.
   */
  $on(n, o) {
    this.events[n] || (this.events[n] = []), this.events[n].push(o);
  }
  /**
   * Removes an event listener for a specific event.
   * @param {string} eventName - The name of the event.
   * @param {Function} callback - The callback function to remove.
   */
  $off(n, o) {
    this.events[n] && (this.events[n] = this.events[n].filter((i) => i !== o));
  }
  /**
   * Fires all listeners for a specific event.
   * @param {string} eventName - The name of the event.
   * @param {...any} args - Arguments to pass to the event listener callbacks.
   */
  emit(n, ...o) {
    this.events[n] && this.events[`${n}`].forEach((i) => {
      try {
        i(...o);
      } catch (a) {
        console.error("error", a);
      }
    });
  }
}
const p = new ce(), V = {
  x: ["left", "center", "right"],
  y: ["top", "bottom"]
}, ue = /* @__PURE__ */ ((e) => () => e++)(0), fe = (e) => typeof e != "string" ? [] : e.split(/\s+/gi).filter((n) => n), de = (e) => {
  typeof e == "string" && (e = fe(e));
  let n = null, o = null;
  return e.forEach((i) => {
    V.y.indexOf(i) !== -1 && (o = i), V.x.indexOf(i) !== -1 && (n = i);
  }), { x: n, y: o };
};
function ye(e, n, o) {
  let i, a = n;
  this.pause = function() {
    clearTimeout(o.timer), a -= Date.now() - i;
  }, this.resume = function() {
    i = Date.now(), clearTimeout(o.timer), o.timer = setTimeout(e, a);
  }, this.resume();
}
const L = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (e) => {
      var n = e.clientHeight;
      return {
        height: [n, 0],
        opacity: [1, 0]
      };
    },
    leave: {
      height: 0,
      opacity: [0, 1]
    }
  }
}, me = {
  __name: "VelocityGroup",
  emits: ["enter", "leave", "afterLeave"],
  setup(e, { emit: n }) {
    const o = n, i = (s, u) => {
      o("enter", { el: s, complete: u });
    }, a = (s, u) => {
      o("leave", { el: s, complete: u });
    }, l = () => {
      o("afterLeave");
    };
    return (s, u) => (y(), O(Y, {
      css: !1,
      onEnter: i,
      onLeave: a,
      onAfterLeave: l
    }, {
      default: S(() => [
        C(s.$slots, "default")
      ]),
      _: 3
    }));
  }
}, pe = {
  __name: "CssGroup",
  props: {
    name: {
      require: !0
    }
  },
  setup(e) {
    const n = e, o = d(() => n.name);
    return (i, a) => (y(), O(Y, { name: o.value }, {
      default: S(() => [
        C(i.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
}, A = "[-+]?[0-9]*.?[0-9]+", W = [
  {
    name: "px",
    regexp: new RegExp(`^${A}px$`)
  },
  {
    name: "%",
    regexp: new RegExp(`^${A}%$`)
  },
  /**
   * Fallback option
   * If no suffix specified, assigning "px"
   */
  {
    name: "px",
    regexp: new RegExp(`^${A}$`)
  }
];
var ve = (e) => {
  if (e === "auto")
    return {
      type: e,
      value: 0
    };
  for (var n = 0; n < W.length; n++) {
    let o = W[n];
    if (o.regexp.test(e))
      return {
        type: o.name,
        value: parseFloat(e)
      };
  }
  return {
    type: "",
    value: e
  };
};
const he = (e) => {
  switch (typeof e) {
    case "number":
      return { type: "px", value: e };
    case "string":
      return ve(e);
    default:
      return { type: "", value: e };
  }
}, ge = (e, n) => {
  const o = e.__vccOpts || e;
  for (const [i, a] of n)
    o[i] = a;
  return o;
}, _ = {
  IDLE: 0,
  DESTROYED: 2
}, xe = {
  name: "Vue3Notifications",
  components: {
    VelocityGroup: me,
    CssGroup: pe
  },
  props: {
    group: {
      type: String,
      default: ""
    },
    width: {
      type: [Number, String],
      default: 300
    },
    reverse: {
      type: Boolean,
      default: !1
    },
    position: {
      type: [String, Array],
      default: () => L.position
    },
    classes: {
      type: String,
      default: "vue-notification"
    },
    animationType: {
      type: String,
      default: "css",
      validator(e) {
        return e === "css" || e === "velocity";
      }
    },
    animation: {
      type: Object,
      default() {
        return L.velocityAnimation;
      }
    },
    animationName: {
      type: String,
      default: L.cssAnimation
    },
    speed: {
      type: Number,
      default: 300
    },
    cooldown: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 3e3
    },
    delay: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1 / 0
    },
    ignoreDuplicates: {
      type: Boolean,
      default: !1
    },
    closeOnClick: {
      type: Boolean,
      default: !0
    },
    pauseOnHover: {
      type: Boolean,
      default: !1
    }
  },
  setup(e, { emit: n }) {
    const o = R([]), i = Le.params.velocity || ne, a = R(null), l = d(() => he(e.width)), s = d(() => e.animationType === "velocity"), u = d(() => s.value ? "VelocityGroup" : "CssGroup"), N = d(() => {
      const { x: t, y: c } = de(e.position), r = l.value.value, g = l.value.type;
      let v = {
        width: r + g,
        [c]: "0px"
      };
      return t === "center" ? v.left = `calc(50% - ${r / 2}${g})` : v[t] = "0px", v;
    }), f = d(() => o.value.filter((t) => t.state !== _.DESTROYED)), E = d(() => Object.hasOwnProperty.call(N.value, "bottom")), j = (t) => {
      n("click", t), e.closeOnClick && m(t);
    }, z = () => {
      e.pauseOnHover && a.value && a.value.pause();
    }, F = () => {
      e.pauseOnHover && a.value && a.value.resume();
    }, w = (t) => {
      if (t.group = t.group || "", t.data = t.data || {}, e.group !== t.group)
        return;
      if (t.clean || t.clear) {
        k();
        return;
      }
      const c = typeof t.duration == "number" ? t.duration : e.duration, r = typeof t.speed == "number" ? t.speed : e.speed, g = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : e.ignoreDuplicates;
      let { title: v, text: K, type: Q, data: X, id: Z } = t;
      const h = {
        id: Z || ue(),
        title: v,
        text: K,
        type: Q,
        state: _.IDLE,
        speed: r,
        length: c + 2 * r,
        data: X
      };
      c >= 0 && (a.value = new ye(() => m(h), h.length, h));
      let ee = e.reverse ? !E.value : E.value, x = -1;
      const te = f.value.some((H) => H.title === t.title && H.text === t.text);
      (!g || !te) && (ee ? (o.value.push(h), f.value.length > e.max && (x = 0)) : (o.value.unshift(h), f.value.length > e.max && (x = f.value.length - 1)), x !== -1 && m(f.value[x]));
    }, D = (t) => {
      $(t);
    }, P = (t) => [
      "vue-notification-template",
      e.classes,
      t.type
    ], q = (t) => s.value ? null : { transition: `all ${t.speed}ms` }, m = (t) => {
      clearTimeout(t.timer), t.state = _.DESTROYED, s.value || B(), n("destroy", t);
    }, $ = (t) => {
      const c = o.value.find((r) => r.id === t);
      c && m(c);
    }, k = () => {
      f.value.forEach(m);
    }, b = (t, c) => {
      const r = e.animation[t];
      return typeof r == "function" ? r.call(this, c) : r;
    }, U = (t, c) => {
      const r = b("enter", t);
      i(t, r, {
        duration: e.speed,
        complete: c
      });
    }, J = (t, c) => {
      let r = b("leave", t);
      i(t, r, {
        duration: e.speed,
        complete: c
      });
    }, B = () => {
      o.value = o.value.filter((t) => t.state !== _.DESTROYED);
    };
    return oe(() => {
      p.$on("add", w), p.$on("close", D);
    }), ie(() => {
      p.$off("add", w), p.$off("close", D);
    }), {
      list: o,
      velocity: i,
      timerControl: a,
      actualWidth: l,
      isVA: s,
      componentName: u,
      styles: N,
      active: f,
      botToTop: E,
      destroyIfNecessary: j,
      pauseTimeout: z,
      resumeTimeout: F,
      addItem: w,
      closeItem: D,
      notifyClass: P,
      notifyWrapperStyle: q,
      destroy: m,
      destroyById: $,
      destroyAll: k,
      getAnimation: b,
      enter: U,
      leave: J,
      clean: B
    };
  }
}, Te = ["data-id"], _e = ["onClick"], Ee = ["innerHTML"], we = ["innerHTML"];
function De(e, n, o, i, a, l) {
  return y(), T("div", {
    class: "vue-notification-group",
    style: G(i.styles)
  }, [
    (y(), O(se(i.componentName), {
      name: o.animationName,
      onEnter: i.enter,
      onLeave: i.leave,
      onAfterLeave: i.clean
    }, {
      default: S(() => [
        (y(!0), T(ae, null, re(i.active, (s) => (y(), T("div", {
          class: "vue-notification-wrapper",
          style: G(i.notifyWrapperStyle(s)),
          key: s.id,
          "data-id": s.id,
          onMouseenter: n[0] || (n[0] = (...u) => i.pauseTimeout && i.pauseTimeout(...u)),
          onMouseleave: n[1] || (n[1] = (...u) => i.resumeTimeout && i.resumeTimeout(...u))
        }, [
          C(e.$slots, "body", {
            class: I([o.classes, s.type]),
            item: s,
            close: () => i.destroy(s)
          }, () => [
            M("div", {
              class: I(i.notifyClass(s)),
              onClick: (u) => i.destroyIfNecessary(s)
            }, [
              s.title ? (y(), T("div", {
                key: 0,
                class: "notification-title",
                innerHTML: s.title
              }, null, 8, Ee)) : le("", !0),
              M("div", {
                class: "notification-content",
                innerHTML: s.text
              }, null, 8, we)
            ], 10, _e)
          ])
        ], 44, Te))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const be = /* @__PURE__ */ ge(xe, [["render", De]]), Le = {
  install(e, n = {}) {
    if (this.installed)
      return;
    this.installed = !0, this.params = n, e.component(n.componentName || "notifications", be);
    const o = (l) => {
      typeof l == "string" && (l = { title: "", text: l }), typeof l == "object" && p.emit("add", l);
    };
    o.close = function(l) {
      p.emit("close", l);
    };
    const i = n.name || "notify", a = n.window || !1;
    e.config.globalProperties["$" + i] = o, a !== !1 && (window["$" + a] = o), e.provide(i, o);
  }
};
export {
  Le as default
};
