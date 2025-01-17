var SelectPure = function () {
    "use strict";

    function e(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }

    function t(e, t) {
        for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
    }

    function n(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e
    }

    function i(e, t, n) {
        return t in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e
    }

    function s(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            t && (i = i.filter((function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable
            }))), n.push.apply(n, i)
        }
        return n
    }

    function o(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? s(Object(n), !0).forEach((function (t) {
                i(e, t, n[t])
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function (t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
            }))
        }
        return e
    }

    function a(e) {
        return function (e) {
            if (Array.isArray(e)) return l(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && Symbol.iterator in Object(e)) return Array.from(e)
        }(e) || function (e, t) {
            if (!e) return;
            if ("string" == typeof e) return l(e, t);
            var n = Object.prototype.toString.call(e).slice(8, -1);
            "Object" === n && e.constructor && (n = e.constructor.name);
            if ("Map" === n || "Set" === n) return Array.from(e);
            if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return l(e, t)
        }(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function l(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var n = 0, i = new Array(t); n < t; n++) i[n] = e[n];
        return i
    }

    var c = {value: "data-value", disabled: "data-disabled", class: "class", type: "type"}, r = function () {
        function t(n) {
            var i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                s = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
            return e(this, t), this._node = n instanceof HTMLElement ? n : document.createElement(n), this._config = {i18n: s}, this._setAttributes(i), i.textContent && this._setTextContent(i.textContent), this
        }

        return n(t, [{
            key: "get", value: function () {
                return this._node
            }
        }, {
            key: "append", value: function (e) {
                return this._node.appendChild(e), this
            }
        }, {
            key: "addClass", value: function (e) {
                return this._node.classList.add(e), this
            }
        }, {
            key: "removeClass", value: function (e) {
                return this._node.classList.remove(e), this
            }
        }, {
            key: "toggleClass", value: function (e) {
                return this._node.classList.toggle(e), this
            }
        }, {
            key: "addEventListener", value: function (e, t) {
                return this._node.addEventListener(e, t), this
            }
        }, {
            key: "removeEventListener", value: function (e, t) {
                return this._node.removeEventListener(e, t), this
            }
        }, {
            key: "setText", value: function (e) {
                return this._setTextContent(e), this
            }
        }, {
            key: "getHeight", value: function () {
                return window.getComputedStyle(this._node).height
            }
        }, {
            key: "setTop", value: function (e) {
                return this._node.style.top = "".concat(e, "px"), this
            }
        }, {
            key: "focus", value: function () {
                return this._node.focus(), this
            }
        }, {
            key: "_setTextContent", value: function (e) {
                this._node.textContent = e
            }
        }, {
            key: "_setAttributes", value: function (e) {
                for (var t in e) c[t] && e[t] && this._setAttribute(c[t], e[t])
            }
        }, {
            key: "_setAttribute", value: function (e, t) {
                this._node.setAttribute(e, t)
            }
        }]), t
    }(), u = {
        select: "select-pure__select",
        dropdownShown: "select-pure__select--opened",
        multiselect: "select-pure__select--multiple",
        label: "select-pure__label",
        placeholder: "select-pure__placeholder",
        dropdown: "select-pure__options",
        option: "select-pure__option",
        optionDisabled: "select-pure__option--disabled",
        autocompleteInput: "select-pure__autocomplete",
        selectedLabel: "select-pure__selected-label",
        selectedOption: "select-pure__option--selected",
        placeholderHidden: "select-pure__placeholder--hidden",
        optionHidden: "select-pure__option--hidden"
    };
    return function () {
        function t(n, i) {
            e(this, t), this._config = o(o({}, i), {}, {
                classNames: o(o({}, u), i.classNames),
                disabledOptions: []
            }), this._state = {opened: !1}, this._icons = [], this._boundHandleClick = this._handleClick.bind(this), this._boundUnselectOption = this._unselectOption.bind(this), this._boundSortOptions = this._sortOptions.bind(this), this._body = new r(document.body), this._create(n), this._config.value && this._setValue()
        }

        return n(t, [{
            key: "value", value: function () {
                return this._config.value
            }
        }, {
            key: "reset", value: function () {
                this._config.value = this._config.multiple ? [] : null, this._setValue()
            }
        }, {
            key: "_create", value: function (e) {
                var t = "string" == typeof e ? document.querySelector(e) : e;
                this._parent = new r(t), this._select = new r("div", {class: this._config.classNames.select}), this._label = new r("span", {class: this._config.classNames.label}), this._optionsWrapper = new r("div", {class: this._config.classNames.dropdown}), this._config.multiple && this._select.addClass(this._config.classNames.multiselect), this._options = this._generateOptions(), this._select.addEventListener("click", this._boundHandleClick), this._select.append(this._label.get()), this._select.append(this._optionsWrapper.get()), this._parent.append(this._select.get()), this._placeholder = new r("span", {
                    class: this._config.classNames.placeholder,
                    textContent: this._config.placeholder
                }), this._select.append(this._placeholder.get())
            }
        }, {
            key: "_generateOptions", value: function () {
                var e = this;
                return this._config.autocomplete && (this._autocomplete = new r("input", {
                    class: this._config.classNames.autocompleteInput,
                    type: "text"
                }), this._autocomplete.addEventListener("input", this._boundSortOptions), this._optionsWrapper.append(this._autocomplete.get())), this._config.options.map((function (t) {
                    var n = new r("div", {
                        class: "".concat(e._config.classNames.option).concat(t.disabled ? " " + e._config.classNames.optionDisabled : ""),
                        value: t.value,
                        textContent: t.label,
                        disabled: t.disabled
                    });
                    return t.disabled && e._config.disabledOptions.push(String(t.value)), e._optionsWrapper.append(n.get()), n
                }))
            }
        }, {
            key: "_handleClick", value: function (e) {
                if (e.stopPropagation(), e.target.className !== this._config.classNames.autocompleteInput) {
                    if (this._state.opened) {
                        var t = this._options.find((function (t) {
                            return t.get() === e.target
                        }));
                        return t && this._setValue(t.get().getAttribute("data-value"), !0), this._select.removeClass(this._config.classNames.dropdownShown), this._body.removeEventListener("click", this._boundHandleClick), this._select.addEventListener("click", this._boundHandleClick), void (this._state.opened = !1)
                    }
                    e.target.className !== this._config.icon && (this._select.addClass(this._config.classNames.dropdownShown), this._body.addEventListener("click", this._boundHandleClick), this._select.removeEventListener("click", this._boundHandleClick), this._state.opened = !0, this._autocomplete && this._autocomplete.focus())
                }
            }
        }, {
            key: "_setValue", value: function (e, t, n) {
                var i = this;
                if (!(this._config.disabledOptions.indexOf(e) > -1)) {
                    if (e && !n && (this._config.value = this._config.multiple ? [].concat(a(this._config.value || []), [e]) : e), e && n && (this._config.value = e), this._options.forEach((function (e) {
                        e.removeClass(i._config.classNames.selectedOption)
                    })), this._placeholder.removeClass(this._config.classNames.placeholderHidden), this._config.multiple) {
                        var s = this._config.value.map((function (e) {
                            var t = i._config.options.find((function (t) {
                                return t.value.toString() === e.toString()
                            }));
                            return i._options.find((function (e) {
                                return e.get().getAttribute("data-value") === t.value.toString()
                            })).addClass(i._config.classNames.selectedOption), t
                        }));
                        return s.length && this._placeholder.addClass(this._config.classNames.placeholderHidden), void this._selectOptions(s, t)
                    }
                    var o = this._config.value ? this._config.options.find((function (e) {
                        return e.value.toString() === i._config.value
                    })) : this._config.options[0], l = this._options.find((function (e) {
                        return e.get().getAttribute("data-value") === o.value.toString()
                    }));
                    this._config.value ? (l.addClass(this._config.classNames.selectedOption), this._placeholder.addClass(this._config.classNames.placeholderHidden), this._selectOption(o, t)) : this._label.setText("")
                }
            }
        }, {
            key: "_selectOption", value: function (e, t) {
                this._selectedOption = e, this._label.setText(e.label), this._config.onChange && t && this._config.onChange(e.value)
            }
        }, {
            key: "_selectOptions", value: function (e, t) {
                var n = this;
                this._label.setText(""), this._icons = e.map((function (e) {
                    var t = new r("span", {class: n._config.classNames.selectedLabel, textContent: e.label}),
                        i = new r(n._config.inlineIcon ? n._config.inlineIcon.cloneNode(!0) : "i", {
                            class: n._config.icon,
                            value: e.value
                        });
                    return i.addEventListener("click", n._boundUnselectOption), t.append(i.get()), n._label.append(t.get()), i.get()
                })), t && this._optionsWrapper.setTop(Number(this._select.getHeight().split("px")[0]) + 5), this._config.onChange && t && this._config.onChange(this._config.value)
            }
        }, {
            key: "_unselectOption", value: function (e) {
                var t = a(this._config.value), n = t.indexOf(e.target.getAttribute("data-value"));
                -1 !== n && t.splice(n, 1), this._setValue(t, !0, !0)
            }
        }, {
            key: "_sortOptions", value: function (e) {
                var t = this;
                this._options.forEach((function (n) {
                    n.get().textContent.toLowerCase().startsWith(e.target.value.toLowerCase()) ? n.removeClass(t._config.classNames.optionHidden) : n.addClass(t._config.classNames.optionHidden)
                }))
            }
        }]), t
    }()
}();
