/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer HTML Client - lscommons.js
 * Version 5.0 Build 1446 Revision: 29106 $
 * Copyright (c) 2004-2011 Weswit Srl. All Rights Reserved.
 */




(function(define) {
    define([], function() {
        if (!document.getElementById) {
            throw ("Browser not compatible");
        }
        if (window.Lightstreamer) {
            throw ("Warning: Lightstreamer singleton already on the page; lscommons.js should be the first Lightstreamer file included");
        }
        var Lightstreamer = function() {};
        Lightstreamer = {
            II: false,
            Rn: " 28994 $",
            Yg: false,
            uY: function() {},
            Ui: function(rP) {
                var dW = "";
                for (var GN in rP) {
                    if (!this[GN]) {
                        this[GN] = rP[GN];
                    } else {}
                }
            },
            Ou: function(Ke, Ls, vk) {
                var Ri = {};
                for (var GN in Ls.prototype) {
                    if (Ke.prototype[GN]) {
                        if (!vk) {
                            var ci = "super_" + GN;
                            while (Ls.prototype["_" + ci]) {
                                ci = "super_" + ci;
                            }
                            Ke.prototype["_" + ci] = Ls.prototype[GN];
                        } else if (vk === "O") {
                            Ke.prototype[GN] = Ls.prototype[GN];
                        }
                    } else {
                        if (GN.indexOf("_super_") != 0 || !vk) {
                            Ke.prototype[GN] = Ls.prototype[GN];
                        }
                    }
                }
                if (!vk) {
                    var Qt = "_super";
                    while (Ke.prototype[Qt]) {
                        Qt += "_super";
                    }
                    Ke.prototype[Qt] = Ls;
                }
                if (!Ke.prototype.AE) {
                    Ke.prototype.AE = this.Hm;
                }
                if (!Ke.prototype.uW) {
                    Ke.prototype.uW = this.DM;
                }
            },
            Hm: function(JJ, oM) {
                if (JJ.prototype["_super_" + oM]) {
                    while (JJ.prototype["_super_" + oM]) {
                        oM = "super_" + oM;
                    }
                    oM = "_" + oM;
                } else {
                    return;
                }
                if (this[oM].apply) {
                    return this[oM].apply(this, Lightstreamer.mf(arguments, 2));
                }
            },
            DM: function(JJ) {
                var oM = "_super";
                if (JJ.prototype[oM]) {
                    while (JJ.prototype[oM + "_super"]) {
                        oM += "_super";
                    }
                    if (this[oM].apply) {
                        this[oM].apply(this, Lightstreamer.mf(arguments, 1));
                    }
                }
            },
            mf: function(wF, TK) {
                var cJ = [];
                for (var RT = TK, lC = wF.length; RT < lC; RT++) {
                    cJ[RT - TK] = wF[RT];
                }
                return cJ;
            },
            BA: [],
            getLogger: function() {
                return Lightstreamer.kZ;
            },
            gQ: function() {
                return new Date().getTime();
            }
        };
        (function(ls) {
            var EG = "gi_buf";
            ls.Ui({
                NU: "CONNECTING",
                Qa: "STREAMING",
                KH: "STALLED",
                gU: "POLLING",
                aH: "DISCONNECTED",
                Nu: {
                    length: -1
                },
                aA: new RegExp("^[a-zA-Z0-9]*$"),
                PA: new RegExp("^[a-zA-Z0-9_]*$"),
                bS: new RegExp("^[a-zA-Z0-9_\.^]*$"),
                EJ: "LS4_",
                sQ: function(Xf) {
                    var gI = [].concat(Xf);
                    if (typeof(gI[0]) == "undefined") {
                        return gI;
                    }
                    return [null].concat(gI);
                },
                dj: function(rW) {
                    if (window.encodeURIComponent) {
                        return encodeURIComponent(rW);
                    } else {
                        rW = escape(rW);
                        return rW.replace(ls.Xi, "%2B");
                    }
                },
                vK: function(mr) {
                    if (window.decodeURIComponent) {
                        return decodeURIComponent(mr);
                    } else {
                        return unescape(mr);
                    }
                },
                xL: function(Ii, hP) {
                    ls.bm(Ii, function() {
                        if (ls.Yg) {
                            return;
                        }
                        hP();
                    });
                },
                bm: function(Ii, hP) {
                    if (typeof window.addEventListener != "undefined") {
                        window.addEventListener(Ii, hP, false);
                        return true;
                    } else if (typeof document.addEventListener != "undefined") {
                        document.addEventListener(Ii, hP, false);
                        return true;
                    } else if (typeof window.attachEvent != "undefined") {
                        return window.attachEvent("on" + Ii, hP);
                    } else {
                        return false;
                    }
                },
                jI: function(Bi, qs, eH, kD, min, max) {
                    var FJ = new Number(Bi);
                    var BS = this.BF ? this.BF : ls.Og;
                    if (isNaN(FJ)) {
                        BS.kE("This is a not valid value for " + qs + ": " + '"' + Bi + '"' + ". Please use a number", qs);
                        return eH;
                    } else if (kD == true && FJ != Math.round(FJ)) {
                        BS.kE("This is a not valid value for " + qs + ": " + Bi + ". Please use an integer", qs);
                        return eH;
                    } else if (!isNaN(min) && FJ < min) {
                        BS.kE("This is a not valid value for " + qs + ": " + Bi + ". The minimum value allowed is " + min, qs);
                        return eH;
                    } else if (!isNaN(max) && FJ > max) {
                        BS.kE("This is a not valid value for " + qs + ": " + Bi + ". The maximum value allowed is " + max, qs);
                        return eH;
                    } else {
                        BS.log(qs, FJ);
                        return FJ;
                    }
                },
                oI: function(Bi, qs, eH) {
                    var BS = this.BF ? this.BF : ls.Og;
                    if (Bi === true || Bi === false) {
                        BS.log(qs, Bi);
                        return Bi;
                    } else {
                        BS.kE("This is a not valid value for " + qs + ": " + '"' + Bi + '"' + ". Please use true or false", qs);
                        return eH;
                    }
                },
                Vj: function(Dc) {
                    if (this.YX != null && this.YX != "") {
                        var bi = "" + Dc;
                        var Fn = "" + this.YX;
                        if (bi.toLowerCase().indexOf(Fn.toLowerCase()) == -1) {
                            return false;
                        }
                    }
                    return true;
                },
                sg: function(Bi) {
                    if (typeof Bi != "undefined") {
                        if (Bi === true || Bi === false) {
                            return Bi === true;
                        } else if (Bi == null) {
                            return null;
                        } else if (!isNaN(Bi) && Bi != "") {
                            return parseFloat(Bi, 10);
                        } else if ((Bi || Bi == "") && Bi.toString) {
                            return Bi.toString();
                        } else if (isNaN(Bi)) {
                            return NaN;
                        } else {
                            ls.Og.kw(false, 'sg');
                            return Bi;
                        }
                    }
                    return null;
                },
                WQ: new RegExp("^\\s*([\\s\\S]*?)\\s*$"),
                sB: function(Li) {
                    return Li.replace(ls.WQ, "$1");
                },
                Ma: function(wu, eg) {
                    return !wu || (eg.toLowerCase() == "http:" && wu == 80) || (eg.toLowerCase() == "https:" && wu == 443);
                },
                nt: function(pl, ko) {
                    var RG = [];
                    for (var Jo = 0, lC = pl.length; GN < lC; GN++) {
                        if (pl[Jo] == null) {
                            RG[Jo] = null;
                        } else if (ko) {
                            RG[Jo] = new Number(pl[Jo]);
                        } else {
                            RG[Jo] = new String(pl[Jo]);
                        }
                    }
                    return xg;
                },
                AC: function(pl, ko) {
                    var xg = {};
                    for (var Jo in pl) {
                        if (pl[Jo] == null) {
                            xg[Jo] = null;
                        } else if (ko) {
                            xg[Jo] = new Number(pl[Jo]);
                        } else {
                            xg[Jo] = new String(pl[Jo]);
                        }
                    }
                    return xg;
                },
                vb: function(max) {
                    max = max ? max : 1000;
                    return Math.round(Math.random() * max);
                },
                getClosureFor: function(RL, ou) {
                    return function() {
                        var wF = arguments;
                        return function() {
                            RL.apply(ou, wF);
                        };
                    };
                },
                getClosureForNoParams: function(RL, ou) {
                    return function() {
                        RL.apply(ou, arguments);
                    };
                },
                TA: function() {
                    return navigator.onLine === false;
                },
                AI: EG.substring(1, 2),
                Fr: EG.substring(0, 1),
                De: EG.substring(0, 2),
                Xi: new RegExp("\\+", ls.De)
            });
        })(Lightstreamer);
        Lightstreamer.avoidLSGlobals = false;
        Lightstreamer.Ui({
            cr: function() {
                this.Cv(["ChartLine", "ChartTable", "DynaMetapushTable", "DynaScrollTable", "FieldNameDescriptor", "FieldPositionDescriptor", "GroupIdDescriptor", "GroupListDescriptor", "ItemNameDescriptor", "ItemPositionDescriptor", "LabelFormatter", "MetapushTable", "MultiDynaMetapushTable", "NonVisualTable", "OverwriteTable", "PushPage", "SchemaIdDescriptor", "SchemaListDescriptor", "ScreenTableHelper", "ScrollTable", "FlashBridge", "MessageListener"], true, true);
            },
            Cv: function(du, lA, mG) {
                for (var GN = 0; GN < du.length; GN++) {
                    this.Hs(du[GN]);
                }
                if (lA) {
                    window.LS_cell = Lightstreamer.cellOverwrite;
                    window.LS_cs = Lightstreamer.cellScroll;
                    window.LS_cM = Lightstreamer.cellMetapush;
                }
                if (mG) {
                    window.LS_fadeCell = Lightstreamer.HB;
                }
            },
            Hs: function(qs) {
                if (Lightstreamer[qs]) {
                    window[qs] = Lightstreamer[qs];
                }
            },
            hO: function() {
                var Yv = document.getElementsByTagName("script");
                for (var GN = 0; GN < Yv.length; GN++) {
                    var VS = null;
                    if ((VS = /lspushpage\.js\?(.*)$/.exec(Yv[GN].src)) != null) {
                        Lightstreamer.avoidLSGlobals = (VS[1] == "avoidLSGlobals=true");
                    }
                }
            }
        });
        Lightstreamer.Ui({
            Fi: null,
            xx: null,
            Kg: function() {
                if (this.Fi != null) {
                    return this.Fi;
                }
                if ((document.childNodes) && (!document.all) && (!navigator.taintEnabled) && (!navigator.accentColorName)) {
                    this.Fi = true;
                    return true;
                }
                this.Fi = false;
                return false;
            },
            xW: function() {
                if (this.xx != null) {
                    return this.xx;
                }
                if (this.Kg()) {
                    fD = navigator.userAgent;
                    if (fD) {
                        if (fD.indexOf(" Version/") > -1) {
                            if (fD.indexOf(" Version/3.0") <= -1) {
                                this.xx = false;
                                return false;
                            }
                        } else if (fD.indexOf("Chrome/") > -1) {
                            this.xx = false;
                            return false;
                        }
                    }
                    this.xx = true;
                    return true;
                }
                this.xx = false;
                return false;
            },
            Tp: new RegExp("[^0-9.]+", Lightstreamer.Fr),
            xF: null,
            tj: function(sn, VD) {
                if (window.opera) {
                    if (!sn) {
                        return true;
                    }
                    if (this.xF === null) {
                        if (!window.opera.version) {
                            this.xF = 7;
                        } else {
                            var lY = window.opera.version();
                            lY = lY.replace(this.Tp, "");
                            this.xF = parseFloat(lY);
                        }
                    }
                    if (VD === true) {
                        return this.xF <= sn;
                    } else if (VD === false) {
                        return this.xF >= sn;
                    } else {
                        return this.xF == sn;
                    }
                }
                return false;
            },
            rT: new RegExp("msie([0-9]+)[.;]", Lightstreamer.Fr),
            Ej: null,
            ZK: function(sn, VD) {
                if (window.ActiveXObject) {
                    if (this.Ej === null && sn) {
                        var mk = navigator.userAgent.toLowerCase();
                        var VS = this.rT.exec(mk);
                        if (VS && VS.length >= 2) {
                            this.Ej = VS[1];
                        }
                    }
                    if (this.Ej !== null && sn) {
                        if (VD === true) {
                            return this.Ej <= sn;
                        } else if (VD === false) {
                            return this.Ej >= sn;
                        } else {
                            return this.Ej == sn;
                        }
                    }
                    return true;
                }
                return false;
            },
            oK: null,
            YC: function() {
                if (this.oK !== null) {
                    return this.oK;
                }
                var mk = navigator.userAgent.toLowerCase();
                if (window.ScriptEngine && (ScriptEngine().indexOf("InScript") > -1)) {
                    if (mk.indexOf("icab") > -1) {
                        Lightstreamer.SF.log('YC', "iCab");
                        this.oK = true;
                        return true;
                    }
                }
                if (document.all) {
                    UL = mk.indexOf("msie");
                    if (UL > -1) {
                        SG = mk.substring(UL + 5, UL + 8);
                        if (SG.indexOf(5) > -1) {
                            Lightstreamer.SF.log('YC', "IE5");
                            this.oK = true;
                            return true;
                        }
                    }
                }
                Lightstreamer.SF.log('YC', false);
                this.oK = false;
                return false;
            },
            PS: {},
            GD: new RegExp("Firefox\\/(\\d+\\.?\\d*)"),
            ms: function(sn, VD) {
                if (this.PS === null) {
                    return false;
                }
                if (!sn) {
                    sn = -1;
                    VD = false;
                } else {
                    VD = VD === true || VD === false ? VD : "";
                }
                if (this.PS[sn + "" + VD] || this.PS[sn + "" + VD] === false) {
                    return this.PS[sn + "" + VD];
                }
                var uo = navigator.userAgent;
                if (uo.indexOf("Firefox") <= -1) {
                    this.PS = null;
                    return false;
                }
                var nY = 0;
                if (uo.indexOf("Firefox/") > -1) {
                    var vW = this.GD.exec(uo);
                    if (vW) {
                        nY = Number(vW[1]);
                    }
                }
                var VS;
                if (VD === true) {
                    VS = nY <= sn;
                } else if (VD === false) {
                    VS = nY >= sn;
                } else {
                    VS = nY == sn;
                }
                this.PS[sn + "" + VD] = VS;
                return VS;
            },
            Lq: null,
            Ao: function() {
                if (this.Lq !== null) {
                    return this.Lq;
                }
                var uo = navigator.userAgent;
                uo = uo.toLowerCase();
                this.Lq = uo.indexOf("android") > -1 && uo.indexOf("webkit") > -1;
                return this.Lq;
            },
            Zh: null,
            tK: function() {
                if (this.Zh !== null) {
                    return this.Zh;
                }
                var uo = navigator.userAgent;
                this.Zh = uo.indexOf("Chrome/") > -1;
                return this.Zh;
            }
        });
        (function(ls) {
            ls.Ui({
                FU: function(uu, gH) {
                    ls.uK.log('FU', uu, gH);
                    this.TE(uu, gH, "");
                },
                TE: function(uu, gH, Ch) {
                    var bp = "";
                    if (ls.YX != null && ls.YX != "") {
                        bp = "domain=." + ls.YX + "; ";
                    }
                    var om = ls.dj(uu) + "=" + gH + "; ";
                    var dT = om + bp + Ch + "path=/;";
                    document.cookie = dT;
                    ls.uK.log('TE', dT);
                },
                IY: function(uu) {
                    uu = ls.dj(uu) + "=";
                    var Lr = document.cookie.toString();
                    Lr = Lr.split(";");
                    var BS = ls.uK;
                    for (var GN = 0; GN < Lr.length; GN++) {
                        Lr[GN] = ls.sB(Lr[GN]);
                        BS.log('IY', uu, "?", Lr[GN]);
                        if (Lr[GN].indexOf(uu) == 0) {
                            var HN = Lr[GN].substring(uu.length, Lr[GN].length);
                            BS.log('IY', uu, HN);
                            return HN;
                        }
                    }
                    BS.log('IY', uu, null);
                    return null;
                },
                fK: function(uu) {
                    ls.uK.log('fK', uu);
                    var XK = new Date();
                    XK.setTime(XK.getTime() - 86400000);
                    var Ch = "expires=" + XK.toGMTString() + "; ";
                    this.TE(uu, "deleting", Ch);
                },
                pW: false,
                ju: function() {
                    var BS = ls.uK;
                    BS.log('ju', 0);
                    var PM = ls.vb();
                    var ZJ = "LS__cookie_test" + PM;
                    this.FU(ZJ, "testing");
                    var lo = this.IY(ZJ);
                    if (lo == "testing") {
                        BS.log('ju', 1);
                        this.fK(ZJ);
                        lo = this.IY(ZJ);
                        if (lo == null) {
                            BS.log('ju', 2);
                            this.pW = true;
                        }
                    }
                },
                tu: 1000,
                We: 200
            });
        })(Lightstreamer);
        Lightstreamer.Ui({
            RY: "|",
            QX: function(uu) {
                var js = this.IY(uu);
                if (!js) {
                    return null;
                }
                var iL = js.split(this.RY);
                if (iL[0] == "") {
                    iL.shift();
                }
                if (iL[iL.length - 1] == "") {
                    iL.pop();
                }
                return iL.length > 0 ? iL : null;
            },
            aV: function(uu, id) {
                var gH = this.IY(uu);
                if (!gH) {
                    gH = this.RY;
                } else if (gH.indexOf(this.RY + id + this.RY) > -1) {
                    return false;
                }
                gH += id + this.RY;
                this.FU(uu, gH);
                return true;
            },
            Fb: function(uu, id) {
                var gH = this.IY(uu);
                if (!gH) {
                    return;
                }
                var cs = this.RY + id + this.RY;
                if (gH.indexOf(cs) > -1) {
                    gH = gH.replace(cs, this.RY);
                    if (gH == this.RY) {
                        this.fK(uu);
                    } else {
                        this.FU(uu, gH);
                    }
                }
            },
            xK: function(uu, LD) {
                var gH = LD.join(this.RY);
                this.FU(uu, gH);
            }
        });
        (function(ls) {
            ls.BL = function(Gb) {
                this.vS = null;
                if (typeof Gb != "undefined") {
                    this.vS = Gb;
                } else {
                    this.vS = {};
                }
            };
            ls.BL.Te = function(pl, ko) {
                var iT = {};
                var vS = pl.Yd();
                for (var Dk in vS) {
                    iT[Dk] = {};
                    for (var oG in vS[Dk]) {
                        if (vS[Dk][oG] == null) {
                            iT[Dk][oG] = null;
                        } else if (ko) {
                            iT[Dk][oG] = new Number(vS[Dk][oG]);
                        } else {
                            iT[Dk][oG] = new String(vS[Dk][oG]);
                        }
                    }
                }
                return new this(iT);
            };
            ls.BL.prototype = {
                fS: function(Qw, Dk, oG) {
                    if (!this.vS[Dk]) {
                        this.vS[Dk] = {};
                    }
                    this.vS[Dk][oG] = Qw;
                },
                Fe: function(Dk, oG) {
                    if (!this.vS[Dk]) {
                        return null;
                    }
                    if (typeof this.vS[Dk][oG] == "undefined") {
                        return null;
                    }
                    return this.vS[Dk][oG];
                },
                rA: function(Dk, oG) {
                    if (!this.vS[Dk]) {
                        return;
                    }
                    if (this.vS[Dk][oG]) {
                        delete(this.vS[Dk][oG]);
                    }
                    for (var GN in this.vS[Dk]) {
                        return;
                    }
                    delete(this.vS[Dk]);
                },
                insertRow: function(Pf, Dk) {
                    this.vS[Dk] = Pf;
                },
                US: function(Dk) {
                    if (!this.vS[Dk]) {
                        return null;
                    }
                    return this.vS[Dk];
                },
                Nn: function(Dk) {
                    var Uw = this.US(Dk);
                    this.Lb(Dk);
                    return Uw;
                },
                Lb: function(Dk) {
                    if (!this.vS[Dk]) {
                        return;
                    }
                    delete(this.vS[Dk]);
                },
                Yd: function() {
                    return this.vS;
                }
            };
        })(Lightstreamer);
        Lightstreamer.Vq = function(mc) {
            this.gB = mc ? mc : "GE";
        };
        Lightstreamer.Vq.prototype = {
            mM: function(Oj) {
                var VS = false;
                if (Oj) {
                    VS = Lightstreamer.kZ.mM(Oj);
                }
                return VS || Lightstreamer.kZ.mM(this.gB);
            },
            QA: function(xv) {
                if (Lightstreamer.Vr) {
                    this.log(xv, arguments, Lightstreamer.Vr);
                } else {
                    this.log(xv, arguments);
                }
            },
            log: function(xv) {
                if (!this.mM()) {
                    return;
                }
                if (Lightstreamer.obfMap) {
                    xv = Lightstreamer.obfMap.IQb(xv);
                }
                var Zr = this.KR(arguments);
                Lightstreamer.kZ.Nb(this.gB, Zr);
            },
            Gk: function(ij, xv, gB, Vt, wF) {
                if (!this.mM(gB)) {
                    return;
                }
                if (Lightstreamer.obfMap) {
                    wF[Vt] = Lightstreamer.obfMap.IQb(wF[Vt]);
                }
                var Zr = ij + " " + this.KR(wF, Vt);
                if (this.gB != gB) {
                    Lightstreamer.kZ.Nb(this.gB, Zr, ij);
                }
                Lightstreamer.kZ.Nb(gB, Zr, ij);
            },
            CP: function(Wq, xv) {
                this.Gk(this.RV(Wq), xv, "EX", 1, arguments);
            },
            Ct: function(xv, Ax) {
                this.Gk(Ax, xv, "EX", 1, arguments);
            },
            error: function(Ft, xv) {
                this.Gk(Ft, xv, "ER", 1, arguments);
            },
            kE: function(Ft, xv) {
                this.error(Ft, xv);
                throw (Ft);
            },
            aG: function(Ft, xv) {
                if (!this.mM("ER")) {
                    return;
                }
                Lightstreamer.FD.fx(this.error, 0, this, [Ft, xv]);
            },
            Ek: function(Wq, Ax, xv) {
                this.Gk(this.RV(Wq, Ax), xv, "ER", 2, arguments);
            },
            kw: function(In, xv) {
                if (!In) {
                    this.Gk("", xv, "AS", 1, arguments);
                }
            },
            KR: function(wF, gG) {
                gG = gG ? gG : 0;
                var Zr = " ";
                for (var GN = gG; GN < wF.length; GN++) {
                    try {
                        var FC = wF[GN];
                        if (FC == null) {
                            Zr += "NULL";
                        } else if (FC.prototype) {
                            Zr += FC.apply();
                        } else if (FC.length < 0) {
                            Zr += "*";
                        } else if (FC.charAt != null) {
                            Zr += FC;
                        } else if (FC[0] == FC) {
                            Zr += FC;
                        } else if (FC.length != null && FC.top == null) {
                            Zr += "(";
                            Zr += this.KR(FC);
                            Zr += ")";
                        } else {
                            Zr += FC;
                        }
                        Zr += " ";
                    } catch (Wq) {
                        Zr += "missing-parameter ";
                    }
                }
                return Zr;
            },
            RV: function(Wq, YW) {
                var eO = Wq.message;
                if (typeof eO == "undefined") {
                    if (Wq.getMessage) {
                        eO = Wq.getMessage();
                    }
                    if (typeof eO == "undefined") {
                        eO = Wq;
                    }
                }
                var VS = "exception\n" + eO + " \n\n";
                if (YW) {
                    VS += "thrown by your callback\n\n" + YW;
                }
                if (Wq.stack) {
                    VS += Wq.stack;
                    VS += "\n";
                }
                return VS;
            }
        };
        (function(ls) {
            ls.LogSystem = function() {
                this.cn = "";
                this.ie = {};
                this.ie.length = 0;
                this.EX = 0;
                this.iv = new ls.BufferConsumer();
                this.addConsumer(this.iv, true);
                this.iv.ci++;
                this.iv.gp[0] = "START OF LOG";
                this.iv.gp[0 + "_C"] = "GE";
                this.TP = {};
                this.BF = this.getLogger("LS");
            };
            ls.LogSystem.prototype = {
                getLogger: function(mc) {
                    if (!this.TP[mc]) {
                        this.TP[mc] = new ls.Vq(mc);
                    }
                    return this.TP[mc];
                },
                getInternalLog: function() {
                    return this.iv;
                },
                addConsumer: function(Dq, SY) {
                    this.ie[this.ie.length] = Dq;
                    this.ie.length++;
                    Dq.wR = this;
                    if (SY != true) {
                        this.iv.sendLogToConsumer(Dq);
                    }
                    var cK = Dq.Md.split(" ");
                    this.wH(cK);
                },
                removeConsumer: function(Dq) {
                    lq = false;
                    var GN = 0;
                    while ((GN < this.ie.length) && (!lq)) {
                        if (this.ie[GN] == Dq) {
                            this.gF(GN);
                            lq = true;
                        }
                        GN++;
                    }
                    return lq;
                },
                gF: function(GN) {
                    EU = this.ie.length - 1;
                    if (GN != EU) {
                        this.ie[GN] = this.ie[EU];
                    }
                    delete(this.ie[EU]);
                    this.ie.length--;
                    this.gJ();
                },
                RX: function(gB) {
                    if (!gB) {
                        return;
                    }
                    if (this.cn.indexOf(gB) > -1) {
                        return;
                    }
                    if (this.cn == "") {
                        this.cn += gB;
                    } else {
                        this.cn += " " + gB;
                    }
                    this.iv.addLogCategory(gB);
                },
                wH: function(Md) {
                    for (var gB in Md) {
                        this.RX(Md[gB]);
                    }
                },
                gJ: function() {
                    this.cn = "";
                    for (var GN = 0; GN < this.ie.length; GN++) {
                        var cK = this.ie[GN].Md.split(" ");
                        this.wH(cK);
                    }
                },
                Nb: function(mc, Zr, dS) {
                    if (!this.mM(mc)) {
                        return;
                    }
                    var dg = ++this.EX;
                    Zr = this.jX(dg) + mc + " " + Zr;
                    this.ce(mc, Zr, dS);
                    return Zr;
                },
                mM: function(mc) {
                    if (this.cn.length == 0 || this.cn.indexOf(mc) == -1) {
                        return false;
                    }
                    return true;
                },
                jX: function(dg) {
                    var cP = new Date();
                    var Zr = window.name;
                    Zr += " ";
                    Zr += dg;
                    Zr += ": ";
                    Zr += cP.getHours();
                    Zr += ":";
                    Zr += cP.getMinutes();
                    Zr += ":";
                    Zr += cP.getSeconds();
                    Zr += ",";
                    Zr += cP.getMilliseconds();
                    Zr += " ";
                    return Zr;
                },
                ce: function(mc, Zr, dS) {
                    var GN;
                    for (GN = 0; GN < this.ie.length; GN++) {
                        var Dq = this.ie[GN];
                        try {
                            if (Dq.Md.indexOf(mc) > -1) {
                                if (Dq.hG == true) {
                                    Dq.WC(dS, mc);
                                } else {
                                    Dq.WC(Zr, mc);
                                }
                            }
                        } catch (Wq) {}
                    }
                },
                AG: function(Dq, tD) {
                    this.BF.error("Sorry, the " + Dq + " is not compatible with this Browser", tD);
                },
                KW: function(gB) {
                    return (gB == "ER" || gB == "AS" || gB == "EX");
                },
                SW: function() {
                    for (var GN = 0; GN < this.ie.length; GN++) {
                        if (this.ie[GN].Ko) {
                            this.ie[GN].Ko();
                        }
                    }
                },
                Qk: function(ou, Ax, ij) {
                    var LU = true;
                    if ((typeof gA != "undefined") && (gA)) {
                        LU = !Ra.Rhp("onClientAlert", 'TMH', {
                            Ax: Ax,
                            ij: ij
                        });
                    }
                    if (LU && ou.onClientAlert) {
                        try {
                            ou.onClientAlert(Ax, ij);
                        } catch (Wq) {
                            this.BF.Ek(Wq, ou.onClientAlert, "onClientAlert");
                        }
                    }
                },
                Qq: function() {
                    var gp = new ls.BufferConsumer();
                    gp.setHistoryDim(10);
                    gp.addLogCategory("ER");
                    gp.hG = true;
                    ls.Jm = gp;
                    this.addConsumer(gp);
                },
                Pe: function(Ys, Dd) {
                    with(Lightstreamer) {
                        if (GL == null && Jm != null) {
                            GL = new FunctionConsumer(Ys, Dd);
                            GL.addLogCategory("ER");
                            GL.hG = true;
                            this.removeConsumer(Jm);
                            Jm.sendLogToConsumer(GL);
                            this.addConsumer(GL, true);
                            Jm = null;
                        }
                    }
                }
            };
            ls.BA.push(function() {
                ls.kZ = new ls.LogSystem();
                ls.kZ.iv.setHistoryDim(5);
            });
        })(Lightstreamer);
        Lightstreamer.Ui({
            cw: null,
            Ps: null,
            GL: null,
            Jm: null
        });
        (function(ls) {
            ls.LogConsumer = function() {
                this.wR;
                this.Md = "";
                this.hG = false;
            };
            ls.LogConsumer.prototype = {
                WC: function(Zr, gB) {},
                isCompatible: function() {
                    return false;
                },
                addLogCategory: function(gB) {
                    if (!gB) {
                        return;
                    }
                    if (this.Md.indexOf(gB) > -1) {
                        return;
                    }
                    if (this.Md == "") {
                        this.Md += gB;
                    } else {
                        this.Md += " " + gB;
                    }
                    if (this.wR) {
                        this.wR.RX(gB);
                    }
                },
                getLogCategories: function() {
                    return this.Md;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.BufferConsumer = function() {
                this.uW(ls.BufferConsumer);
                this.VR = 0;
                this.ds = 0;
                this.ci = -1;
                this.gp = {};
            };
            ls.BufferConsumer.prototype = {
                isCompatible: function() {
                    return true;
                },
                extractLog: function(JD, Gs, SQ, Um) {
                    var GN;
                    var Qs = 1;
                    if (JD == null) {
                        GN = this.ds;
                    } else {
                        GN = this.ci - JD + 1;
                        if (GN < this.ds) {
                            GN = this.ds;
                        }
                    }
                    if (Gs == null) {
                        Gs = "\n";
                    }
                    var rH = "";
                    Um = Um === true;
                    while (GN <= this.ci) {
                        if (typeof SQ != "undefined" && SQ) {
                            rH += SQ;
                            if (Um) {
                                rH += Qs + "=";
                            }
                        }
                        if (Um) {
                            rH += ls.dj(this.gp[GN].replace(/[\n\r\f]/g, "||"));
                        } else {
                            rH += this.gp[GN];
                        }
                        rH += Gs;
                        GN++;
                        Qs++;
                    }
                    return rH;
                },
                sendLogToConsumer: function(Dq) {
                    var GN = this.ds;
                    while (GN <= this.ci) {
                        if (Dq.Md.indexOf(this.gp[GN + "_C"]) > -1) {
                            Dq.WC(this.gp[GN], this.gp[GN + "_C"]);
                        }
                        GN++;
                    }
                },
                setHistoryDim: function(nS) {
                    this.VR = nS;
                },
                WC: function(Zr, gB) {
                    var dg = ++this.ci;
                    var gG = dg - this.VR + 1;
                    while (this.ds < gG) {
                        delete(this.gp[this.ds]);
                        delete(this.gp[this.ds + "_C"]);
                        this.ds++;
                    }
                    this.gp[dg] = Zr;
                    this.gp[dg + "_C"] = gB;
                }
            };
            ls.Ou(ls.BufferConsumer, ls.LogConsumer);
        })(Lightstreamer);
        (function(ls) {
            ls.RemoteConsumer = function(Up, HA, wm) {
                this.uW(ls.RemoteConsumer);
                this.Up = Up;
                this.HA = HA ? HA : 0;
                this.wm = wm ? wm : 0;
                this.SK = 0;
                this.te = 0;
                this.EP = 100;
                this.gp = new ls.BufferConsumer();
                this.gp.setHistoryDim(this.Up);
            };
            ls.RemoteConsumer.prototype = {
                vt: function() {
                    var bH = false;
                    if ((typeof gA != "undefined") && (gA)) {
                        bH = true;
                    } else if (!ls.rG || !ls.rG.kh) {
                        if (this.te < this.EP) {
                            this.gp.setHistoryDim(this.te + 1);
                        }
                        return;
                    }
                    var mE = this.gp.extractLog(this.te, "&", "LS_log", true);
                    if (mE != "") {
                        if (bH) {
                            gA.wkv(mE);
                        } else {
                            ls.rG.NQ('wkv', mE);
                        }
                    }
                    this.te = 0;
                    this.gp = new ls.BufferConsumer();
                    this.gp.setHistoryDim(this.Up);
                },
                Ko: function() {
                    ls.FD.fx(this.vt, 0, this);
                },
                WC: function(Zr, gB) {
                    if (this.wm > 0 && this.SK >= this.wm) {
                        if (this.te > 0) {
                            this.Ko();
                        }
                        return;
                    }
                    if (this.HA > 0 && Zr.length > this.HA) {
                        Zr = Zr.substr(0, this.HA);
                    }
                    this.te++;
                    this.gp.WC(Zr, gB);
                    this.SK++;
                    if (this.te >= this.Up) {
                        this.Ko();
                    }
                },
                xp: function(hM) {
                    if (!hM) {
                        this.HA = 0;
                    } else {
                        this.HA = hM;
                    }
                },
                JT: function(max) {
                    if (!max) {
                        this.wm = 0;
                    } else {
                        this.wm = max;
                    }
                },
                isCompatible: function() {
                    return true;
                }
            };
            ls.Ou(ls.RemoteConsumer, ls.LogConsumer);
        })(Lightstreamer);
        (function(ls) {
            ls.FunctionConsumer = function(uw, kv, Yk) {
                this.uW(ls.FunctionConsumer);
                this.uw = uw;
                this.Yk = Yk ? Yk : uw;
                this.kv = kv;
            };
            ls.FunctionConsumer.prototype = {
                isCompatible: function() {
                    if (!this.uw) {
                        return false;
                    }
                    return (this.uw.apply) ? true : false;
                },
                WC: function(Zr, gB) {
                    var VN = new Array(Zr);
                    var oM = this.uw;
                    if (ls.kZ.KW(gB)) {
                        oM = this.Yk;
                    }
                    if (oM.apply) {
                        try {
                            oM.apply(this.kv, VN);
                        } catch (Wq) {}
                    }
                }
            };
            ls.Ou(ls.FunctionConsumer, ls.LogConsumer);
        })(Lightstreamer);
        (function(ls) {
            ls.AlertConsumer = function(Up) {
                this.uW(ls.AlertConsumer);
                this.Hl = Up;
                this.te = 0;
                this.gp = new ls.BufferConsumer();
                this.gp.setHistoryDim(this.Hl);
            };
            ls.AlertConsumer.prototype = {
                isCompatible: function() {
                    return window.alert;
                },
                WC: function(Zr, gB) {
                    this.te++;
                    this.gp.WC(Zr, gB);
                    if (this.te >= this.Hl) {
                        this.te = 0;
                        ls.FD.fx(this.XN, 0, this, [this.gp.extractLog(this.Hl, "\n")]);
                        this.gp = new ls.BufferConsumer();
                        this.gp.setHistoryDim(this.Hl);
                    }
                },
                XN: function(text) {
                    alert(text);
                }
            };
            ls.Ou(ls.AlertConsumer, ls.LogConsumer);
        })(Lightstreamer);
        (function(ls) {
            var jo = "popup warning";
            ls.hS = function(iA) {
                this.Vl = iA;
                this.BF = ls.kZ.getLogger("FM");
                this.XR = ls.kZ.getLogger("CE");
                this.DE = ls.kZ.getLogger("M1");
            };
            ls.hS.prototype = {
                HS: function(bH, qJ) {
                    var VS = this.Pa(bH, qJ);
                    this.XR.QA('HS', bH, qJ, VS.No, VS.log, VS.dO);
                    return VS;
                },
                Pa: function(bH, qJ) {
                    var Sc = {};
                    var wZ = 1;
                    try {
                        if (this.Vl == null) {
                            wZ = 2;
                            Sc.log = "null";
                            Sc.ZA = 1;
                            Sc.dO = true;
                            return Sc;
                        } else if (this.Vl.closed) {
                            wZ = 3;
                            this.Vl = null;
                            Sc.log = "closed";
                            Sc.ZA = 2;
                            Sc.dO = true;
                            return Sc;
                        } else if (!this.Vl.Lightstreamer || (bH && !this.Vl.Lightstreamer.II)) {
                            wZ = 4;
                            Sc.log = (!this.Vl.Lightstreamer) ? "not global" : "not active";
                            Sc.ZA = (!this.Vl.Lightstreamer) ? 3 : 4;
                            this.Vl = null;
                            Sc.dO = false;
                            return Sc;
                        } else if (bH) {
                            if (this.Vl.Ra) {
                                wZ = 5;
                                if (!this.Vl.gA) {
                                    wZ = 11;
                                    this.Vl = null;
                                    Sc.log = "too young";
                                    Sc.ZA = 5;
                                    Sc.dO = false;
                                    return Sc;
                                } else if (qJ && !this.Vl.gA.JW) {
                                    wZ = 6;
                                    this.Vl = null;
                                    Sc.log = "wait conf";
                                    Sc.ZA = 7;
                                    Sc.dO = false;
                                    return Sc;
                                }
                            } else if (this.Vl.Lightstreamer.AD) {
                                if (this.Vl.Lightstreamer.AD.XG) {
                                    wZ = 7;
                                    var mg = this.Vl.Lightstreamer.AD.XG;
                                    if (ls.AD) {
                                        ls.AD.XG = mg;
                                    }
                                    this.Vl = mg;
                                    var rL = this.HS(true);
                                    rL.log = "linked: " + rL.log;
                                    Sc.ZA = 8;
                                    return rL;
                                } else {
                                    wZ = 8;
                                    this.Vl = null;
                                    Sc.log = "linked w/o reference";
                                    Sc.ZA = 9;
                                    Sc.dO = false;
                                    return Sc;
                                }
                            } else {
                                wZ = 9;
                                this.BF.kw(false, 'HS', this.Vl);
                                this.Vl = null;
                                Sc.log = "not engine";
                                Sc.ZA = 10;
                                Sc.dO = true;
                                return Sc;
                            }
                        }
                        wZ = 10;
                        Sc.log = "OK";
                        Sc.ZA = 11;
                        Sc.No = true;
                        return Sc;
                    } catch (Wq) {
                        this.Vl = null;
                        Sc.log = "exception " + wZ + " " + Wq;
                        Sc.ZA = 12;
                        Sc.dO = true;
                        return Sc;
                    }
                },
                mq: function(JZ, dr) {
                    var pe = JZ + "__TRASH";
                    var ok = this.nq(JZ, pe);
                    var Rt = "eval(" + '"' + ok + "; " + '"' + ")";
                    this.BF.log('mq', 1);
                    var He = ls.TB("javascript:" + Rt, JZ);
                    this.BF.log('mq', 2, He);
                    if (He === false) {
                        return false;
                    } else if (!He) {
                        var He = ls.TB(ls.fp, JZ);
                        this.BF.log('mq', 4, He);
                        if (He === false) {
                            return false;
                        } else if (He == null) {
                            this.DE.log(jo, 1);
                            return true;
                        }
                    }
                    try {
                        this.BF.log('mq', 5);
                        if (He.closed) {
                            return true;
                        }
                        if (dr) {
                            this.BF.log('mq', 5.1);
                            if (He == He.top && !He.Lightstreamer) {
                                this.BF.log('mq', 5.2);
                                this.DE.log(jo, 2);
                                try {
                                    this.WE(He, JZ, pe);
                                } catch (Wq) {
                                    this.BF.CP(Wq, 'mq', 22);
                                }
                                return true;
                            }
                            He = He.parent;
                            this.BF.log('mq', 5.3);
                            if (He == null) {
                                return true;
                            }
                        }
                        this.BF.log('mq', 6);
                        if (!He.Lightstreamer) {
                            return true;
                        }
                        this.BF.log('mq', 7);
                        if (!He.Lightstreamer.kZ) {
                            return true;
                        }
                        this.BF.log('mq', 8);
                        this.Vl = He;
                    } catch (Wq) {
                        this.BF.CP(Wq, 'mq', 11);
                    }
                    return true;
                },
                Cf: function(mm, KN) {
                    if (this.mq("LS__" + mm, true) === false) {
                        return false;
                    }
                    var dW = this.HS(true, !KN);
                    return dW;
                },
                nq: function(qs, rC) {
                    var Fk = function(qs, rC) {
                        if (window.name == qs) {
                            if (window == top && !(window.Lightstreamer && window.Lightstreamer.kZ)) {
                                window.name = rC;
                                window.close();
                            }
                        }
                    };
                    var hR = "callFun";
                    return "var " + hR + " = " + Fk.toString() + "; " + hR + "('" + qs + "', '" + rC + "');";
                },
                WE: function(He, JZ, pe) {
                    if (He.name != JZ && He.name != pe) {
                        return;
                    }
                    He.close();
                }
            };
        })(Lightstreamer);
        Lightstreamer.Ui({
            Hu: 0,
            IX: 0,
            ZQ: false,
            pS: "You have Norton Internet Security or Norton\nPersonal Firewall installed on this computer.\nIf no real-time data show up, then you need\nto disable Ad Blocking in Norton Internet\nSecurity and then refresh this page",
            TB: function(CI, JZ, uH) {
                var Sc = null;
                Lightstreamer.SF.log('TB', document.cookie);
                try {
                    Sc = this.TN(CI, JZ, uH);
                } catch (Wq) {
                    Lightstreamer.SF.CP(Wq);
                    return false;
                }
                if (Sc) {
                    try {
                        this.IX++;
                    } catch (Rd) {
                        this.Yg = true;
                    }
                }
                return Sc;
            },
            TN: function(CI, JZ, uH) {
                if (window.SymError) {
                    var QN = true;
                    if ((this.IX - this.Hu) < -5) {
                        QN = false;
                    }
                    if (window.SymRealWinOpen && QN) {
                        this.Hu++;
                        Lightstreamer.SF.log('TN', 1);
                        return window.SymRealWinOpen(CI, JZ, "height=100,width=100", true);
                    } else if (!this.ZQ) {
                        this.ZQ = true;
                        Lightstreamer.SF.aG(this.pS, "window.open");
                        var ZN = null;
                        if (window.gA) {
                            ZN = gA;
                        } else if (Lightstreamer.AD) {
                            ZN = Lightstreamer.AD;
                        }
                        if (ZN != null) {
                            Lightstreamer.kZ.Qk(ZN, 100, this.pS);
                        }
                    }
                    QN = true;
                    this.Hu = 0;
                    return null;
                } else {
                    if (!uH && Lightstreamer.gQ() - Lightstreamer.Dl > Lightstreamer.gD) {
                        return false;
                    }
                    return window.open(CI, JZ, "height=100,width=100", true);
                }
            }
        });
        Lightstreamer.Ui({
            fI: function(aW) {
                var gZ = 0;
                var bN = aW.length;
                for (var GN = 0; GN < bN; GN++) {
                    gZ += aW.charCodeAt(GN);
                }
                return parseInt(gZ);
            },
            Ta: function(xI, uu, gG, Fu, rr) {
                var dP = 3;
                var PV;
                var cX = gG;
                var It = gG - Fu;
                var VS = "";
                var gZ = this.fI(uu.toString());
                if (gZ > 0) {
                    var OJ = xI.length;
                    if (OJ > 0) {
                        var GN;
                        for (GN = 0; cX + dP - GN <= OJ; GN += 3) {
                            var Ar = GN;
                            if (It > 0) {
                                for (Ar = gZ * 3; Ar >= It; Ar -= It);
                            }
                            var Em = xI.substring(GN, dP - 1);
                            var Lk = xI.substring(Ar, Ar + 2);
                            var vu = xI.substring(cX, cX + dP - GN);
                            PV = parseInt(Em) - parseInt(Lk) + rr - parseInt(vu);
                            var vT = unescape("%" + PV.toString(16));
                            VS = vT + VS;
                            dP += 3;
                            cX += 3;
                            gZ += PV;
                        }
                    }
                }
                return VS;
            }
        });
        (function(ls) {
            Lightstreamer.MessageListener = function() {};
            Lightstreamer.MessageListener.prototype = {
                onAbort: function() {
                    return;
                },
                onError: function() {
                    return;
                },
                onDiscarded: function() {
                    return;
                },
                onDeny: function(code, message) {
                    return;
                },
                onProcessed: function() {
                    return;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.sX = function(KF) {
                this.name = null;
                this.parent = null;
                this.BF = ls.kZ.getLogger("OP");
                if (KF) {
                    this.jg(KF);
                }
            };
            ls.sX.prototype = {
                sD: ls.jI,
                AY: ls.oI,
                Vh: function(tY, Bi) {
                    this[tY] = ls.sg(Bi);
                    if (this.parent == window.gA) {
                        this.OV(tY);
                    }
                },
                OV: function(Qc, hE, Bt) {
                    var Jp = 'Dch';
                    var Pp = {
                        Dd: this.name,
                        tY: Qc
                    };
                    Pp.Bi = ls.sg(this[Qc]);
                    this.BF.log('OV', Qc, (Qc != 'PG' ? this[Qc] : "[...]"));
                    if (this.parent == window.gA) {
                        var QR = Ra.iuc();
                        for (var GN in QR) {
                            QR[GN].NQ(Jp, Pp);
                        }
                    } else {
                        if (!ls.rG.clQ(Jp, Pp)) {
                            this.BF.error("The LightstreamerEngine instance is not available", hE);
                            this[Qc] = Bt;
                            return false;
                        }
                    }
                    return true;
                },
                jg: function(hZ) {
                    var Yw = this.ni;
                    for (var GN = 0; GN < Yw.length; GN++) {
                        this[Yw[GN]] = ls.sg(hZ[Yw[GN]]);
                    }
                }
            };
        })(Lightstreamer);
        Lightstreamer.YX = null;
        Lightstreamer.fp = "lsblank.html?";
        (function(ls) {
            var ni = ['jh', 'Fq', 'VY', 'HA', 'wm'];
            Lightstreamer.Context = function() {
                this.jh = null;
                this.Fq = null;
                this.VY = null;
                this.HA = 0;
                this.wm = 0;
                this.kZ = null;
                this.ni = ni;
                this.uW(ls.Context, arguments[0]);
                this.name = "context";
            };
            Lightstreamer.Context.prototype = {
                getLogger: function() {
                    return this.kZ;
                },
                jg: function(hZ) {
                    this.AE(ls.Context, 'jg', hZ);
                    if (!this.kZ && hZ.kZ) {
                        this.kZ = hZ.kZ;
                    }
                },
                bind: function() {
                    if (this.parent && this.parent != window.gA) {
                        return;
                    }
                    if (ls.YX != null && ls.YX != "") {
                        document.domain = ls.YX;
                        var Zb = "domain=" + ls.YX + "&";
                        ls.fp += Zb;
                        if (ls.fO) {
                            ls.fO.QD = Zb;
                        }
                    }
                    ls.nm = this;
                    ls.ju();
                    return true;
                },
                setDebugAlertsOnClientError: function(Wg) {
                    var Bt = this.Fq;
                    this.Fq = Wg === true;
                    if (this.parent == null) {
                        this.Kw();
                    } else {
                        this.OV('Fq', "setDebugAlertsOnClientError", Bt);
                    }
                },
                Kw: function() {
                    if (this.Fq) {
                        if (!ls.cw) {
                            var cw = new ls.AlertConsumer(1);
                            cw.addLogCategory("ER");
                            ls.kZ.addConsumer(cw, true);
                            ls.cw = cw;
                            this.BF.log('Kw', 1);
                        } else {
                            this.BF.log('Kw', 2);
                        }
                    } else if (ls.cw) {
                        ls.kZ.removeConsumer(ls.cw);
                        ls.cw = null;
                        this.BF.log('Kw', 3);
                    } else {
                        this.BF.log('Kw', 4);
                    }
                },
                setRemoteAlertsOnClientError: function(Wg, HA, wm) {
                    var OL = this.VY;
                    var mQ = this.wm;
                    var vo = this.HA;
                    this.VY = Wg === true;
                    if (wm) {
                        this.wm = this.sD(wm, "setRemoteAlertsOnClientError", this.wm, true, 0);
                    }
                    if (HA) {
                        this.HA = this.sD(HA, "setRemoteAlertsOnClientError", this.HA, true, 0);
                    }
                    if (this.parent == null) {
                        this.DQ();
                    } else {
                        var VS = this.OV('wm', "setRemoteAlertsOnClientError");
                        VS &= this.OV('HA', "setRemoteAlertsOnClientError");
                        VS &= this.OV('VY', "setRemoteAlertsOnClientError");
                        if (!VS) {
                            this.VY = OL;
                            this.wm = mQ;
                            this.HA = vo;
                        }
                    }
                },
                DQ: function() {
                    if (this.VY) {
                        if (ls.Ps) {
                            ls.Ps.xp(this.HA);
                            ls.Ps.JT(this.wm);
                            this.BF.log('DQ', 2);
                        } else {
                            var Ps = new ls.RemoteConsumer(1, this.HA, this.wm);
                            Ps.addLogCategory("ER");
                            ls.kZ.addConsumer(Ps, true);
                            ls.Ps = Ps;
                            this.BF.log('DQ', 1);
                        }
                    } else if (ls.Ps) {
                        ls.kZ.removeConsumer(ls.Ps);
                        ls.Ps = null;
                        this.BF.log('DQ', 3);
                    } else {
                        this.BF.log('DQ', 4);
                    }
                },
                setDomain: function(domain) {
                    if (this.parent == window.gA || this.parent == null) {
                        if (domain != null && domain != "" && ls.nm != this) {
                            ls.YX = domain;
                            this.jh = ls.YX;
                            this.BF.log("setDomain", ls.YX);
                        }
                        if (!ls.Vj(location.hostname)) {
                            this.BF.error("The domain set is inconsistent with the hostname used", "setDomain");
                        }
                    }
                }
            };
            ls.Ou(ls.Context, ls.sX);
            ls.BA.push(function() {
                ls.GQ = new ls.Context();
                ls.GQ.setDebugAlertsOnClientError(true);
                ls.GQ.kZ = ls.kZ;
            });
        })(Lightstreamer);
        (function(ls) {
            var ni = ['PK', 'Fl', 'xf', 'vl', 'Bj', 'OR', 'tm', 'IQ', 'ut', 'Nx', 'Ow', 'ii', 'RU', 'AB', 'sc'];
            Lightstreamer.Policy = function() {
                this.PK = 0;
                this.Fl = NaN;
                this.xf = NaN;
                this.vl = 2000;
                this.Bj = 3000;
                this.OR = NaN;
                this.tm = 0;
                this.IQ = 30000;
                this.ut = true;
                this.Nx = true;
                this.Ow = 4000;
                this.ii = 1000;
                this.RU = 300;
                this.AB = 2000;
                this.sc = 4000;
                this.ni = ni;
                this.uW(ls.Policy, arguments[0]);
                this.name = "policy";
            };
            Lightstreamer.Policy.prototype = {
                setForceBindTimeout: function(Sr) {
                    var Bt = this.AB;
                    this.AB = this.sD(Sr, "setForceBindTimeout", this.setForceBindTimeout, true, 0);
                    this.OV('AB', "setForceBindTimeout", Bt);
                },
                getForceBindTimeout: function() {
                    return this.AB;
                },
                setSwitchCheckTimeout: function(Sr) {
                    var Bt = this.sc;
                    this.sc = this.sD(Sr, "setSwitchCheckTimeout", this.setSwitchCheckTimeout, true, 0);
                    this.OV('sc', "setSwitchCheckTimeout", Bt);
                },
                getSwitchCheckTimeout: function() {
                    return this.sc;
                },
                setRequestSerializationTimeout: function(Sr) {
                    var Bt = this.RU;
                    this.RU = this.sD(Sr, "setRequestSerializationTimeout", this.RU, true, 0);
                    this.OV('RU', "setRequestSerializationTimeout", Bt);
                },
                getRequestSerializationTimeout: function() {
                    return this.RU;
                },
                setMaxBandwidth: function(PK) {
                    var Bt = this.PK;
                    var mA = new String(PK);
                    if (mA.toLowerCase() == "unlimited") {
                        this.PK = 0;
                    } else {
                        this.PK = this.sD(PK, "setMaxBandwidth", this.PK, false, 0);
                    }
                    this.OV('PK', "setMaxBandwidth", Bt);
                },
                getMaxBandwidth: function() {
                    return this.PK;
                },
                setKeepaliveInterval: function(Fl) {
                    var Bt = this.Fl;
                    this.Fl = this.sD(Fl, "setKeepaliveInterval", this.Fl, true, 1);
                    this.OV('Fl', "setKeepaliveInterval", Bt);
                },
                getKeepaliveInterval: function() {
                    if (!isNaN(this.xf)) {
                        return this.xf;
                    }
                    return this.Fl;
                },
                setTimeoutForStalled: function(vl) {
                    var Bt = this.vl;
                    this.vl = this.sD(vl, "setTimeoutForStalled", this.vl, true, 1);
                    this.OV('vl', "setTimeoutForStalled", Bt);
                },
                getTimeoutForStalled: function() {
                    return this.vl;
                },
                setTimeoutForReconnect: function(Bj) {
                    var Bt = this.Bj;
                    this.Bj = this.sD(Bj, "setTimeoutForReconnect", this.Bj, true, 1);
                    this.OV('Bj', "setTimeoutForReconnect", Bt);
                },
                getTimeoutForReconnect: function() {
                    return this.Bj;
                },
                setPollingInterval: function(tm) {
                    var Bt = this.tm;
                    this.tm = this.sD(tm, "setPollingInterval", this.tm, true, 0);
                    this.OV('tm', "setPollingInterval", Bt);
                },
                getPollingInterval: function() {
                    if (!isNaN(this.OR)) {
                        return this.OR;
                    }
                    return this.tm;
                },
                setIdleTimeout: function(IQ) {
                    var Bt = this.IQ;
                    this.IQ = this.sD(IQ, "setIdleTimeout", this.IQ, true, 0);
                    this.OV('IQ', "setIdleTimeout", Bt);
                },
                getIdleTimeout: function() {
                    return this.IQ;
                },
                setSlowingEnabled: function(ut) {
                    var Bt = this.ut;
                    this.ut = this.AY(ut, "setSlowingEnabled", this.ut);
                    this.OV('ut', "setSlowingEnabled", Bt);
                },
                isSlowingEnabled: function() {
                    return this.ut;
                },
                setCanUseGetForStreaming: function(Nx) {
                    var Bt = this.Nx;
                    this.Nx = this.AY(Nx, "setCanUseGetForStreaming", this.Nx);
                    this.OV('Nx', "setCanUseGetForStreaming", Bt);
                },
                canUseGetForStreaming: function() {
                    return this.Nx;
                },
                setBufferedStreamingHandled: function() {},
                setConnectTimeout: function(fs) {
                    var Bt = this.Ow;
                    this.Ow = this.sD(fs, "setConnectTimeout", this.Ow, true, 1);
                    this.OV('Ow', "setConnectTimeout", Bt);
                },
                getConnectTimeout: function() {
                    return this.Ow;
                },
                setFirstPollInterval: function(ux) {
                    var Bt = this.ii;
                    this.ii = this.sD(ux, "setFirstPollInterval", this.ii, true, 0);
                    this.OV('ii', "setFirstPollInterval", Bt);
                },
                getFirstPollInterval: function() {
                    return this.ii;
                }
            };
            ls.Ou(ls.Policy, ls.sX);
        })(Lightstreamer);
        (function(ls) {
            var wY = "/lightstreamer";
            var ni = ['KS', 'IF', 'dE', 'Kb', 'Aj', 'mH', 'PG', 'Si'];
            Lightstreamer.Connection = function() {
                this.KS = wY;
                this.IF = false;
                this.dE = location.hostname;
                this.Kb = location.port;
                this.Aj = null;
                this.Si = "STREAMING_IN_PROGRESS";
                this.mH = null;
                this.PG = null;
                this.ni = ni;
                this.uW(ls.Connection, arguments[0]);
                this.name = "connection";
            };
            Lightstreamer.Connection.prototype = {
                setServerUrlPath: function(mO) {
                    var Bt = this.KS;
                    if (mO) {
                        if (mO.indexOf("/") != 0) {
                            mO = "/" + mO;
                        }
                        while (mO.length > 0 && mO.lastIndexOf("/") == mO.length - 1) {
                            mO = mO.substring(0, mO.length - 1);
                        }
                        this.KS = mO;
                    } else {
                        this.KS = wY;
                    }
                    this.OV('KS', "setServerUrlPath", Bt);
                },
                getServerUrlPath: function() {
                    return this.KS;
                },
                setLSHost: function(LP) {
                    var oC = this.dE;
                    if (LP) {
                        if (LP.indexOf("://") > 0) {
                            LP = LP.substring(LP.indexOf("://") + 3);
                        }
                        if (!ls.Vj(LP) && arguments[1] !== true) {
                            this.BF.error("Lightstreamer Server hostname inconsistent with the domain set", "setLSHost");
                        }
                        this.dE = LP;
                        rl = LP;
                    } else {
                        this.dE = location.hostname;
                        rl = location.hostname;
                    }
                    this.OV('dE', "setLSHost", oC);
                },
                getLSHost: function() {
                    return this.dE;
                },
                setLSPort: function(port) {
                    var Bt = this.Kb;
                    if (port) {
                        this.Kb = this.sD(port, "setLSPort", this.Kb, true, 0);
                    } else {
                        this.Kb = location.port;
                    }
                    this.OV('Kb', "setLSPort", Bt);
                },
                getLSPort: function() {
                    return this.Kb;
                },
                setAdapterName: function(Aj) {
                    var Bt = this.Aj;
                    this.Aj = Aj;
                    this.OV('Aj', "setAdapterName", Bt);
                },
                getAdapterName: function() {
                    return this.Aj;
                },
                setStatusBarUrlPortion: function(Ge) {
                    var Bt = this.Si;
                    this.Si = ls.dj("_" + Ge);
                    this.OV('Si', "setStatusBarUrlPortion", Bt);
                },
                getStatusBarUrlPortion: function() {
                    return this.Si;
                },
                setUserName: function(mH) {
                    var Bt = this.mH;
                    this.mH = mH;
                    this.OV('mH', "setUserName", Bt);
                },
                setPassword: function(VP) {
                    var Bt = this.PG;
                    this.PG = VP;
                    this.OV('PG', "setPassword", Bt);
                }
            };
            ls.Ou(ls.Connection, ls.sX);
        })(Lightstreamer);
        (function(ls) {
            var ni = ['or', 'PB', 'Dh', 'GI'];
            ls.cD = function(KF) {
                this.or = false;
                this.PB = null;
                this.Dh = null;
                this.GI = ls.aH;
                this.ni = ni;
                this.uW(ls.cD, KF);
                this.name = 'Eh';
            };
            ls.Ou(ls.cD, ls.sX);
        })(Lightstreamer);
        (function(ls) {
            ls.Qe = function(Po, fc, FD, tP) {
                this.YJ = tP === true;
                this.Po = Po;
                this.vZ = fc;
                this.ub = (this.YJ) ? [] : {
                    readId: 0,
                    writeId: 0,
                    firstId: 0
                };
                this.FD = FD;
                this.BF = ls.kZ.getLogger("XS");
                if (!this.YJ) {
                    this.Rx = ls.Qe.Wc++;
                    ls.Qe.Ie[this.Rx] = this;
                    if (!ls.Qe.xo) {
                        ls.Qe.xo = true;
                        this.FD.lD(ls.Qe.ot, 50, ls.Qe);
                    }
                }
                this.BF.log('Qe');
            };
            ls.Qe.xo = false;
            ls.Qe.Ie = {};
            ls.Qe.Wc = 0;
            ls.Qe.ot = function() {
                for (var GN in this.Ie) {
                    this.Ie[GN].ot();
                }
            };
            ls.Qe.remove = function(LT) {
                delete(this.Ie[LT.Rx]);
            };
            ls.Qe.prototype = {
                UM: function(iu, jN, NN, Jx) {
                    if (this.YJ) {
                        this.FD.fx(this.VU, 0, this, [iu, jN, NN, Jx]);
                    } else {
                        this.VU(iu, jN, NN, Jx);
                    }
                },
                VU: function(iu, jN, NN, Jx) {
                    if (this.YJ) {
                        this.ub.push(new ls.Qe.fJ(iu, jN, NN, Jx));
                        this.ot();
                    } else {
                        this.Ol();
                        var mF = this.ub.writeId;
                        this.ub[mF] = new ls.Qe.fJ(iu, jN, NN, Jx);
                        this.ub.writeId++;
                        this.Lm();
                    }
                },
                Lm: function() {
                    var jr = this.ub.readId;
                    for (; this.ub.firstId < jr; this.ub.firstId++) {
                        delete(this.ub[this.ub.firstId]);
                    }
                },
                Ol: function() {
                    if (this.ub.firstId == this.ub.readId && this.ub.firstId == this.ub.writeId) {
                        this.ub.writeId = 0;
                        this.ub.readId = 0;
                        this.ub.firstId = 0;
                        this.ub = {
                            readId: 0,
                            writeId: 0,
                            firstId: 0
                        };
                        this.BF.log('Ol');
                    }
                },
                ot: function() {
                    if (this.YJ) {
                        while (this.ub.length > 0) {
                            var iu = this.ub.shift();
                            this.YN(iu);
                        }
                    } else {
                        var mF = this.ub.readId;
                        while (mF < this.ub.writeId) {
                            var iu = this.ub[mF];
                            this.YN(iu);
                            mF++;
                        }
                        this.ub.readId = mF;
                    }
                },
                YN: function(iu) {
                    try {
                        if (!this.Po.ERY(iu.jN, iu.Jx)) {
                            return;
                        }
                        if (this.vZ[iu.iu]) {
                            this.vZ[iu.iu](iu.NN);
                        } else {
                            this.BF.Ct('YN', 3, iu);
                        }
                    } catch (Wq) {
                        this.BF.CP(Wq, 'YN', iu);
                    }
                }
            };
            ls.Qe.fJ = function(iu, mL, UO, ED) {
                this.iu = iu;
                this.jN = mL;
                this.NN = UO;
                this.Jx = ED;
            };
            ls.Qe.fJ.prototype.toString = function() {
                return ["[", 'Qe.Event', this.iu, this.jN, this.NN, this.Jx, "]"].join("|");
            }
        })(Lightstreamer);
        (function(ls) {
            ls.aM = function() {
                this.BF = ls.kZ.getLogger("XX");
                this.Nl = 50;
                this.PF = [];
                this.cP = ls.gQ();
                this.kc();
            };
            ls.aM.OB = function(hB, mX) {
                return hB.Rk - mX.Rk;
            };
            ls.aM.prototype = {
                toString: function() {
                    return ["[", 'aM', this.Nl, this.PF.length, "]"].join("|");
                },
                kc: function() {
                    this.BF.log('kc', 1);
                    if (this.UX) {
                        clearInterval(this.UX);
                        this.BF.log('kc', 2);
                    }
                    this.start();
                },
                start: function() {
                    var Yt = this;
                    this.UX = setInterval(function() {
                        Yt.OM();
                    }, this.Nl);
                },
                mp: function(xv, context, NN) {
                    var kj = {
                        xv: xv
                    };
                    if (context) {
                        kj.context = context;
                    }
                    if (NN) {
                        kj.NN = NN;
                    }
                    return kj;
                },
                HT: function(kj, Rk, Ij) {
                    this.BF.log('HT', 1, Rk, Ij);
                    kj.Nl = Ij ? Rk : null;
                    kj.Rk = this.cP + parseInt(Rk);
                    this.PF.push(kj);
                },
                lD: function(xv, xo, context, NN) {
                    return this.fx(xv, xo, context, NN, true);
                },
                vL: function(kj) {
                    if (!kj) {
                        return;
                    }
                    kj.xv = null;
                    kj.Nl = null;
                },
                fx: function(xv, Rk, context, NN, Ij) {
                    this.BF.log('fx', 1);
                    var kj = this.mp(xv, context, NN);
                    this.HT(kj, Rk, Ij);
                    return kj;
                },
                OM: function() {
                    if (ls.Yg) {
                        clearInterval(this.UX);
                        return;
                    }
                    var ci = this.cP;
                    this.cP = ls.gQ();
                    var Pl = [];
                    if (this.PF.length > 0) {
                        this.PF.sort(ls.aM.OB);
                        while (this.PF.length > 0 && this.PF[0].Rk <= this.cP && !ls.Yg) {
                            var RA = this.PF.shift();
                            if (RA.xv) {
                                this.bu(RA);
                                if (RA.Nl) {
                                    Pl.push(RA);
                                }
                            }
                        }
                    }
                    for (var GN = 0; GN < Pl.length; GN++) {
                        Pl[GN].Rk = this.cP + Pl[GN].Nl;
                        this.PF.push(Pl[GN]);
                    }
                },
                bu: function(kj) {
                    try {
                        if (kj.context) {
                            if (kj.NN) {
                                kj.xv.apply(kj.context, kj.NN);
                            } else {
                                kj.xv.apply(kj.context);
                            }
                        } else if (kj.NN) {
                            kj.xv.apply(null, kj.NN);
                        } else {
                            kj.xv();
                        }
                    } catch (Wq) {
                        var Bv = null;
                        try {
                            Bv = kj.xv.name || kj.xv.toString();
                        } catch (bl) {}
                        this.BF.CP(Wq, 'bu', Bv);
                    }
                }
            };
            ls.BA.push(function() {
                ls.FD = new ls.aM();
            });
        })(Lightstreamer);
        (function(ls) {
            for (var GN = 0; GN < ls.BA.length; GN++) {
                ls.BA[GN]();
            }
            ls.BA = [];
            ls.Og = ls.kZ.getLogger("OP");
            ls.SF = ls.kZ.getLogger("FM");
            ls.uK = ls.kZ.getLogger("CH");
            ls.dq = ls.kZ.getLogger("PC");
            ls.rv = ls.kZ.getLogger("PF");
            ls.uX = ls.kZ.getLogger("LC");
            ls.version = "5.0.1446";
            ls.toString = function() {
                return "[Lightstreamer web client version " + this.version + "]";
            };
            if (window.OpenAjax) {
                if (OpenAjax.hub) {
                    OpenAjax.hub.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", "5.0");
                } else {
                    OpenAjax.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", "5.0");
                    OpenAjax.registerGlobals("Lightstreamer", ["Lightstreamer"]);
                }
            }
        })(Lightstreamer);
        return Lightstreamer;
    });
})(window.define || function(uU, Wo) {
    window.Lightstreamer = Wo()
});
