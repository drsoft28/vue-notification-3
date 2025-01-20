import ne from "velocity-animate";
import { openBlock as d, createBlock as O, TransitionGroup as j, withCtx as S, renderSlot as C, computed as f, ref as R, onMounted as oe, onUnmounted as ie, createElementBlock as T, normalizeStyle as G, resolveDynamicComponent as se, Fragment as ae, renderList as re, normalizeClass as I, createElementVNode as M, createCommentVNode as le } from "vue";
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
      } catch (s) {
        console.error("error", s);
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
  let i, s = n;
  this.pause = function() {
    clearTimeout(o.timer), s -= Date.now() - i;
  }, this.resume = function() {
    i = Date.now(), clearTimeout(o.timer), o.timer = setTimeout(e, s);
  }, this.resume();
}
const L = {
  position: ["top", "right"],
  cssAnimation: "vn-fade",
  velocityAnimation: {
    enter: (e) => {
      console.warn("enter", e);
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
    const o = n, i = (a, c) => {
      o("enter", { el: a, complete: c });
    }, s = (a, c) => {
      o("leave", { el: a, complete: c });
    }, y = () => {
      o("afterLeave");
    };
    return (a, c) => (d(), O(j, {
      css: !1,
      onEnter: i,
      onLeave: s,
      onAfterLeave: y
    }, {
      default: S(() => [
        C(a.$slots, "default")
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
    const n = e, o = f(() => n.name);
    return (i, s) => (d(), O(j, { name: o.value }, {
      default: S(() => [
        C(i.$slots, "default")
      ]),
      _: 3
    }, 8, ["name"]));
  }
}, A = "[-+]?[0-9]*.?[0-9]+", Y = [
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
  for (var n = 0; n < Y.length; n++) {
    let o = Y[n];
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
  for (const [i, s] of n)
    o[i] = s;
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
    const o = R([]), i = Le.params.velocity || ne, s = R(null), y = f(() => he(e.width)), a = f(() => e.animationType === "velocity"), c = f(() => a.value ? "VelocityGroup" : "CssGroup"), N = f(() => {
      const { x: t, y: l } = de(e.position), r = y.value.value, g = y.value.type;
      let v = {
        width: r + g,
        [l]: "0px"
      };
      return t === "center" ? v.left = `calc(50% - ${r / 2}${g})` : v[t] = "0px", v;
    }), u = f(() => o.value.filter((t) => t.state !== _.DESTROYED)), E = f(() => Object.hasOwnProperty.call(N.value, "bottom")), W = (t) => {
      n("click", t), e.closeOnClick && m(t);
    }, z = () => {
      e.pauseOnHover && s.value && s.value.pause();
    }, F = () => {
      e.pauseOnHover && s.value && s.value.resume();
    }, D = (t) => {
      if (t.group = t.group || "", t.data = t.data || {}, e.group !== t.group)
        return;
      if (t.clean || t.clear) {
        $();
        return;
      }
      const l = typeof t.duration == "number" ? t.duration : e.duration, r = typeof t.speed == "number" ? t.speed : e.speed, g = typeof t.ignoreDuplicates == "boolean" ? t.ignoreDuplicates : e.ignoreDuplicates;
      let { title: v, text: K, type: Q, data: X, id: Z } = t;
      const h = {
        id: Z || ue(),
        title: v,
        text: K,
        type: Q,
        state: _.IDLE,
        speed: r,
        length: l + 2 * r,
        data: X
      };
      l >= 0 && (s.value = new ye(() => m(h), h.length, h));
      let ee = e.reverse ? !E.value : E.value, x = -1;
      const te = u.value.some((H) => H.title === t.title && H.text === t.text);
      (!g || !te) && (ee ? (o.value.push(h), u.value.length > e.max && (x = 0)) : (o.value.unshift(h), u.value.length > e.max && (x = u.value.length - 1)), x !== -1 && m(u.value[x]));
    }, b = (t) => {
      k(t);
    }, P = (t) => [
      "vue-notification-template",
      e.classes,
      t.type
    ], q = (t) => a.value ? null : { transition: `all ${t.speed}ms` }, m = (t) => {
      clearTimeout(t.timer), t.state = _.DESTROYED, a.value || B(), n("destroy", t);
    }, k = (t) => {
      const l = o.value.find((r) => r.id === t);
      l && m(l);
    }, $ = () => {
      u.value.forEach(m);
    }, w = (t, l) => {
      const r = e.animation[t];
      return typeof r == "function" ? r.call(this, l) : r;
    }, U = (t, l) => {
      const r = w("enter", t);
      i(t, r, {
        duration: e.speed,
        complete: l
      });
    }, J = (t, l) => {
      let r = w("leave", t);
      i(t, r, {
        duration: e.speed,
        complete: l
      });
    }, B = () => {
      o.value = o.value.filter((t) => t.state !== _.DESTROYED);
    };
    return oe(() => {
      p.$on("add", D), p.$on("close", b);
    }), ie(() => {
      p.$off("add", D), p.$off("close", b);
    }), {
      list: o,
      velocity: i,
      timerControl: s,
      actualWidth: y,
      isVA: a,
      componentName: c,
      styles: N,
      active: u,
      botToTop: E,
      destroyIfNecessary: W,
      pauseTimeout: z,
      resumeTimeout: F,
      addItem: D,
      closeItem: b,
      notifyClass: P,
      notifyWrapperStyle: q,
      destroy: m,
      destroyById: k,
      destroyAll: $,
      getAnimation: w,
      enter: U,
      leave: J,
      clean: B
    };
  }
}, Te = ["data-id"], _e = ["onClick"], Ee = ["innerHTML"], De = ["innerHTML"];
function be(e, n, o, i, s, y) {
  return d(), T("div", {
    class: "vue-notification-group",
    style: G(i.styles)
  }, [
    (d(), O(se(i.componentName), {
      name: o.animationName,
      onEnter: i.enter,
      onLeave: i.leave,
      onAfterLeave: i.clean
    }, {
      default: S(() => [
        (d(!0), T(ae, null, re(i.active, (a) => (d(), T("div", {
          class: "vue-notification-wrapper",
          style: G(i.notifyWrapperStyle(a)),
          key: a.id,
          "data-id": a.id,
          onMouseenter: n[0] || (n[0] = (...c) => i.pauseTimeout && i.pauseTimeout(...c)),
          onMouseleave: n[1] || (n[1] = (...c) => i.resumeTimeout && i.resumeTimeout(...c))
        }, [
          C(e.$slots, "body", {
            class: I([o.classes, a.type]),
            item: a,
            close: () => i.destroy(a)
          }, () => [
            M("div", {
              class: I(i.notifyClass(a)),
              onClick: (c) => i.destroyIfNecessary(a)
            }, [
              a.title ? (d(), T("div", {
                key: 0,
                class: "notification-title",
                innerHTML: a.title
              }, null, 8, Ee)) : le("", !0),
              M("div", {
                class: "notification-content",
                innerHTML: a.text
              }, null, 8, De)
            ], 10, _e)
          ])
        ], 44, Te))), 128))
      ]),
      _: 3
    }, 40, ["name", "onEnter", "onLeave", "onAfterLeave"]))
  ], 4);
}
const we = /* @__PURE__ */ ge(xe, [["render", be]]), Le = {
  install(e, n = {}) {
    if (this.installed)
      return;
    this.installed = !0, this.params = n, e.component(n.componentName || "notifications", we);
    const o = (s) => {
      typeof s == "string" && (s = { title: "", text: s }), typeof s == "object" && p.emit("add", s);
    };
    o.close = function(s) {
      p.emit("close", s);
    };
    const i = n.name || "notify";
    e.config.globalProperties["$" + i] = o, e.provide(i, o);
  }
};
export {
  Le as default
};
