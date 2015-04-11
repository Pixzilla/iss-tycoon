/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer HTML Client - lspushpage.js
 * Version 5.0 Build 1446 Revision: 29106 $
 * Copyright (c) 2004-2011 Weswit Srl. All Rights Reserved.
 */







(function(define) {
    define(["./lscommons"], function(Lightstreamer) {
        if (!Lightstreamer) {
            throw ("Warning: lscommons.js not included before lspushpage.js");
        }
        Lightstreamer.cq = " 28858 $";
        Lightstreamer.uX.log("pushpage", window.name);
        (function(ls) {
            Lightstreamer.GroupDescriptor = function() {
                this.BF = ls.kZ.getLogger("TL");
            };
            ls.GroupDescriptor.prototype = {
                Fa: function(lk) {
                    if (lk == null) {
                        return null;
                    } else if (lk.IM) {
                        return lk.IM;
                    } else if (lk.YF) {
                        if (this.pr) {
                            return this.pr[lk.YF];
                        } else {
                            return null;
                        }
                    } else {
                        var LQ = Number(lk);
                        if (!isNaN(LQ)) {
                            return LQ;
                        } else {
                            if (this.pr) {
                                lk = lk.toString();
                                return this.pr[lk];
                            } else {
                                return null;
                            }
                        }
                    }
                }
            };
            ls.GroupDescriptor.tO = function(nd) {
                if (nd == null) {
                    return null;
                } else if (nd.ev) {
                    return nd;
                } else if (nd.YY) {
                    return nd;
                } else if (nd.join && typeof(nd.join) == "function") {
                    return new ls.GroupListDescriptor(nd);
                } else {
                    return new ls.GroupIdDescriptor(nd);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.GroupIdDescriptor = function(ev) {
                this.uW(ls.GroupIdDescriptor);
                this.ev = String(ev);
            };
            Lightstreamer.GroupIdDescriptor.prototype = {
                wp: function(IM) {
                    return null;
                },
                Ha: function() {
                    return this.ev;
                },
                getId: function() {
                    return this.ev;
                }
            };
            ls.Ou(ls.GroupIdDescriptor, ls.GroupDescriptor);
        })(Lightstreamer);
        (function(ls) {
            var Xa = "item_name_error";
            var bY = "GroupListDescriptor";
            Lightstreamer.GroupListDescriptor = function(ia) {
                this.uW(ls.GroupListDescriptor);
                this.YY = ls.sQ(ia);
                this.pr = {};
                for (var GN = 1; GN < this.YY.length; GN++) {
                    if (!this.EI(this.YY[GN])) {
                        this.YY[GN] = Xa;
                    }
                    this.pr[this.YY[GN]] = GN;
                }
            };
            Lightstreamer.GroupListDescriptor.prototype = {
                EI: function(YF) {
                    if (!YF) {
                        this.BF.error("Item names cannot be empty", bY);
                        return false;
                    }
                    if (!isNaN(YF)) {
                        this.BF.error("Item names cannot be numbers", bY);
                        return false;
                    }
                    if (!ls.bS.test(YF)) {
                        this.BF.error("Item names should be alphanumeric(underscore, caret and dot also allowed)", bY);
                        return false;
                    }
                    return true;
                },
                wp: function(IM) {
                    return this.YY[IM];
                },
                Ha: function() {
                    this.YY.shift();
                    var name = this.YY.join(" ");
                    this.YY = [null].concat(this.YY);
                    return name;
                },
                getList: function() {
                    return this.YY;
                }
            };
            ls.Ou(ls.GroupListDescriptor, ls.GroupDescriptor);
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.SchemaDescriptor = function() {
                this.BF = ls.kZ.getLogger("TL");
                this.iq;
                this.length = 0;
            };
            ls.SchemaDescriptor.prototype = {
                Kq: function(VF, jx) {
                    if (!VF) {
                        return null;
                    } else if (VF.Ms) {
                        return VF.Ms;
                    } else if (VF.Pu) {
                        return this.Zx(VF.Pu, jx);
                    } else {
                        var LQ = Number(VF);
                        if (!isNaN(LQ)) {
                            return LQ;
                        } else {
                            return this.Zx(VF, jx);
                        }
                    }
                },
                gv: function(Ms, jx) {
                    if (typeof(Ms) == "string") {
                        return true;
                    } else if (!jx && this.iq) {
                        return Ms > this.length + this.iq.length;
                    } else {
                        return Ms > this.length;
                    }
                },
                Fs: function() {
                    this.iq = null;
                },
                Jg: function(iq) {
                    if (!this.iq) {
                        this.iq = ls.SchemaDescriptor.Sh(iq);
                    }
                }
            };
            ls.SchemaDescriptor.Sh = function(aN) {
                if (!aN) {
                    return null;
                } else if (aN.Ak) {
                    return aN;
                } else if (aN.IK) {
                    return aN;
                } else if (aN.join && typeof(aN.join) == "function") {
                    return new ls.SchemaListDescriptor(aN);
                } else {
                    return new ls.SchemaIdDescriptor(aN);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.SchemaIdDescriptor = function(Ak) {
                this.uW(ls.SchemaIdDescriptor);
                this.Ak = Ak;
            };
            Lightstreamer.SchemaIdDescriptor.prototype = {
                getId: function() {
                    return this.Ak;
                },
                we: function(Ms, jx) {
                    if (typeof(Ms) == "string") {
                        return Ms;
                    } else if (Ms > this.length && this.iq && !jx) {
                        return this.iq.we(Ms);
                    }
                    return null;
                },
                Zx: function(Pu, jx) {
                    if (this.iq && !jx) {
                        var HC = this.iq.Zx(Pu);
                        if (isNaN(HC)) {
                            return HC;
                        }
                        return this.length + HC;
                    }
                    return Pu;
                },
                vG: function(size) {
                    if (!this.length) {
                        this.length = size;
                    }
                },
                reset: function() {
                    this.length = 0;
                },
                xl: function() {
                    return this.Ak;
                }
            };
            ls.Ou(ls.SchemaIdDescriptor, ls.SchemaDescriptor);
        })(Lightstreamer);
        (function(ls) {
            var bY = "SchemaListDescriptor";
            var Vk = "Field names cannot be ";
            var lu = this.Vk + "empty";
            var LX = this.Vk + "numbers";
            var sV = "Field names should be alphanumeric(underscore, caret and dot also allowed)";
            var Xa = "field_name_error";
            Lightstreamer.SchemaListDescriptor = function(Bo) {
                this.uW(ls.SchemaListDescriptor);
                this.IK = ls.sQ(Bo);
                this.pr = {};
                for (var GN = 1; GN < this.IK.length; GN++) {
                    if (!this.hf(this.IK[GN])) {
                        this.IK[GN] = Xa;
                    }
                    this.pr[this.IK[GN]] = GN;
                }
                this.length = this.IK.length - 1;
            };
            Lightstreamer.SchemaListDescriptor.prototype = {
                getList: function() {
                    return this.IK;
                },
                we: function(Ms, jx) {
                    if (typeof(Ms) == "string") {
                        return Ms;
                    } else if (Ms <= this.length) {
                        return this.IK[Ms];
                    } else if (this.iq && !jx) {
                        var jn = this.iq.we(Ms - this.length);
                        if (this.pr[jn]) {
                            return "$" + jn;
                        }
                        return jn;
                    }
                    return null;
                },
                Zx: function(Pu, jx) {
                    if (this.pr[Pu]) {
                        return this.pr[Pu];
                    } else if (!this.iq || jx) {
                        return Pu;
                    }
                    if (Pu.indexOf("$") == 0) {
                        Pu = Pu.substring(1);
                    }
                    var HC = this.iq.Zx(Pu);
                    if (isNaN(HC)) {
                        return HC;
                    }
                    return this.length + HC;
                },
                hf: function(Pu) {
                    if (!Pu) {
                        this.BF.error(lu, bY);
                        return false;
                    }
                    if (!isNaN(Pu)) {
                        this.BF.error(LX, bY);
                        return false;
                    }
                    if (!ls.bS.test(Pu)) {
                        this.BF.error(sV, bY);
                        return false;
                    }
                    return true;
                },
                vG: function(size) {},
                reset: ls.uY,
                xl: function() {
                    this.IK.shift();
                    var name = this.IK.join(" ");
                    this.IK = [null].concat(this.IK);
                    return name;
                }
            };
            ls.Ou(ls.SchemaListDescriptor, ls.SchemaDescriptor);
        })(Lightstreamer);
        Lightstreamer.ItemDescriptor = function() {};
        Lightstreamer.ItemDescriptor.prototype = {};
        (function(ls) {
            Lightstreamer.ItemNameDescriptor = function(YF) {
                this.uW(ls.ItemNameDescriptor);
                this.YF = String(YF);
            };
            Lightstreamer.ItemNameDescriptor.prototype = {
                toString: function() {
                    return this.YF;
                },
                getName: function() {
                    return this.YF;
                }
            };
            ls.Ou(ls.ItemNameDescriptor, ls.ItemDescriptor);
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.ItemPositionDescriptor = function(IM) {
                this.uW(ls.ItemPositionDescriptor);
                this.IM = Number(IM);
            };
            Lightstreamer.ItemPositionDescriptor.prototype = {
                toString: function() {
                    return String(this.IM);
                },
                getPosition: function() {
                    return this.IM;
                }
            };
            ls.Ou(ls.ItemPositionDescriptor, ls.ItemDescriptor);
        })(Lightstreamer);
        Lightstreamer.FieldDescriptor = function() {};
        Lightstreamer.FieldDescriptor.prototype = {};
        (function(ls) {
            Lightstreamer.FieldNameDescriptor = function(Pu) {
                this.uW(Lightstreamer.FieldNameDescriptor);
                this.Pu = String(Pu);
            };
            Lightstreamer.FieldNameDescriptor.prototype = {
                toString: function() {
                    return this.Pu;
                },
                getName: function() {
                    return this.Pu;
                }
            };
            ls.Ou(ls.FieldNameDescriptor, ls.FieldDescriptor);
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.FieldPositionDescriptor = function(Ms) {
                this.uW(ls.FieldPositionDescriptor);
                this.Ms = Number(Ms);
            };
            Lightstreamer.FieldPositionDescriptor.prototype = {
                toString: function() {
                    return String(this.Ms);
                },
                getPosition: function() {
                    return this.Ms;
                }
            };
            ls.Ou(ls.FieldPositionDescriptor, ls.FieldDescriptor);
        })(Lightstreamer);
        (function(ls) {
            var valueType = {
                input: true,
                textarea: true
            };
            ls.qu = function(Hd, sF) {
                this.jZ = Hd;
                if (!sF) {
                    sF = Hd.getAttribute("upd" + "ate");
                }
                if (sF) {
                    if (sF.toLowerCase().indexOf("style.") == 0) {
                        var Es = sF.slice(6);
                        this.Tr = Hp(Es);
                        this.Rl = pQ(Es);
                    } else {
                        this.Tr = pt(sF);
                        this.Rl = lX(sF);
                    }
                } else {
                    var Aw = Hd.nodeName.toLowerCase();
                    if (Aw in valueType) {
                        this.Tr = pt("value");
                        this.Rl = lX("value");
                    } else {
                        this.Tr = wb;
                        this.Rl = Hq;
                    }
                }
                this.sf = mF++;
                this.FW = null;
                this.sq = null;
                this.HM = 0;
                this.xQ = 0;
            };

            function Hp(sF) {
                return function(gH) {
                    this.jZ.style[sF] = gH === ls.vX ? null : gH;
                };
            }

            function pQ(WN) {
                return function() {
                    return this.jZ.style[WN] || "";
                };
            }

            function pt(sF) {
                return function(gH) {
                    if (!gH || gH === ls.vX) {
                        this.jZ.removeAttribute(sF);
                    } else {
                        this.jZ.setAttribute(sF, gH);
                    }
                };
            }

            function lX(WN) {
                return function() {
                    this.jZ.getAttribute(WN);
                };
            }

            function wb(gH, Mn) {
                if (Mn) {
                    this.jZ.innerHTML = gH;
                } else {
                    if (this.jZ.childNodes.length != 1 || this.jZ.firstChild.nodeType != 3) {
                        if (this.jZ.firstChild != null) {
                            this.jZ.innerHTML = "";
                        }
                        this.jZ.appendChild(document.createTextNode(gH));
                    } else {
                        this.jZ.firstChild.nodeValue = gH;
                    }
                }
            }

            function Hq(GS) {
                if (GS) {
                    return this.jZ.innerHTML;
                } else if (this.jZ.firstChild) {
                    return this.jZ.firstChild.nodeValue;
                }
                return "";
            }
            var mF = 0;

            function XJ(jM) {
                var Li = jM.getAttribute(ls.lN);
                return Li && Li.toUpperCase() == ls.Sv;
            }
            ls.qu.PL = function(Cd, HG) {
                var dl = [];
                if (!HG) {
                    HG = ["*"];
                }
                for (var GN = 0; GN < HG.length; GN++) {
                    var Mw = Cd.getElementsByTagName(HG[GN]);
                    for (var ln = 0; ln < Mw.length; ln++) {
                        if (XJ(Mw[ln])) {
                            dl.push(new ls.qu(Mw[ln]));
                        }
                    }
                }
                return dl;
            };
            ls.qu.gL = function(ES) {
                var Ph = null;
                var tg = ES;
                while (tg != null && tg != document) {
                    Ph = tg;
                    tg = tg.parentNode;
                }
                if (tg == null) {
                    if (Ph != null && Ph.nodeName == "HTML") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            };
            ls.qu.prototype = {
                YB: function(hK) {
                    if (hK != null && this.jZ.className != hK) {
                        this.jZ.className = hK;
                    }
                },
                aO: function(gt) {
                    for (var Jd in gt) {
                        this.jZ.style[Jd] = gt[Jd];
                    }
                },
                gL: function() {
                    return ls.qu.gL(this.jZ);
                },
                KE: function() {
                    if (!this.jZ.id) {
                        return this.gL(this.jZ);
                    }
                    var lq = document.getElementById(this.jZ.id);
                    return (lq === this.jZ);
                },
                Lm: function() {
                    if (this.jZ) {
                        delete(this.jZ);
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Ui({
                cellOverwrite: function(dC, bM, oG, bL, Jf, Gq, JR, wI) {
                    ls.Xh(ls.mD, dC, bM, oG, bL, Jf, Gq, JR, wI, "cellOverwrite");
                },
                cellScroll: function(dC, row, oG, bL, Jf, Gq, JR, wI) {
                    ls.Xh(ls.Nr, dC, row, oG, bL, Jf, Gq, JR, wI, "cellScroll");
                },
                cellMetapush: function(dC, row, oG, bL, Jf, Gq, JR, wI) {
                    ls.Xh(ls.LW, dC, row, oG, bL, Jf, Gq, JR, wI, "cellMetapush");
                },
                Xh: function(Eo, dC, qw, oG, bL, Jf, Gq, JR, wI, ax) {
                    ls.dq.log('Xh', arguments);
                    var Ex = oG.toString();
                    var kQ = qw;
                    if (Eo == ls.mD) {
                        kQ = kQ.toString();
                    }
                    var DX = ls.fU.JG(dC);
                    DX.Ia.fS(Jf, kQ, Ex);
                    DX.vj.fS(bL, kQ, Ex);
                    var BD = ls.fU.QC(bL, Jf, JR, wI);
                    DX.lSC(BD, kQ, Ex, Eo);
                }
            });
        })(Lightstreamer);
        (function(ls) {
            ls.Ui({
                Fg: new RegExp("^https?:\\/\\/", ls.AI),
                kU: function(Ds) {
                    var Kx;
                    if (this.Fg.test(Ds)) {
                        return Ds;
                    } else {
                        Kx = location.protocol + "//" + location.hostname;
                        if (location.port && !ls.Ma(location.port, location.protocol)) {
                            Kx += ":" + location.port;
                        }
                        if (Ds.indexOf("/") != 0) {
                            Kx += location.pathname;
                            var Os = Kx.lastIndexOf("/");
                            if (Os != Kx.length - 1) {
                                Kx = Kx.substring(0, Os + 1);
                            }
                        }
                        Kx += Ds;
                        return Kx;
                    }
                },
                Gi: new RegExp(","),
                HY: new RegExp("\\."),
                YG: function(gH, qa) {
                    if (gH) {
                        if (!gH.replace) {
                            return gH;
                        }
                        if (qa) {
                            gH = gH.replace(this.HY, "");
                            gH = gH.replace(this.Gi, ".");
                        } else {
                            gH = gH.replace(this.Gi, "");
                        }
                        return new Number(gH);
                    }
                    return 0;
                },
                Vr: function() {
                    return ls.rG.toString();
                }
            });
        })(Lightstreamer);
        Lightstreamer.Ui({
            qR: "&nbsp;",
            vX: "\u00A0",
            mD: "H",
            Nr: "V",
            oa: "AV",
            LW: "X",
            Do: "Z",
            pY: "K",
            iw: "AX",
            bG: "AXZ",
            oW: "M",
            XW: "O",
            Pr: "OX",
            VX: "OXZ",
            hk: "A",
            ml: "A",
            Qi: "B",
            PT: "D",
            au: "C",
            Jk: 1,
            NV: 2,
            gd: 3,
            GP: 4,
            oJ: 5
        });
        (function(ls) {
            ls.Sg = function() {
                this.ZZ = {};
                this.BQ = {};
                this.bZ = 0;
                this.Oc = false;
                this.VW = -1;
                this.uj = {};
                this.PR = 0;
                this.BF = ls.kZ.getLogger("LC");
                this.BF.log('Sg', "new PageContext");
            };
            ls.Sg.prototype = {
                JG: function(Rx, hv) {
                    if (!this.ZZ[Rx]) {
                        if (hv == ls.oW) {
                            this.ZZ[Rx] = new ls.ID(Rx);
                        } else {
                            this.ZZ[Rx] = new ls.Vb(Rx);
                        }
                    }
                    return this.ZZ[Rx];
                },
                WX: function(wF, LN) {
                    this.BF.QA('WX', arguments);
                    ls.kZ.getLogger("UP").QA('WX', arguments);
                    var ud = wF[0];
                    var sJ = ls.jD.fXg(ud);
                    if (!sJ) {
                        return true;
                    }
                    sJ.ZBk(wF, LN, false);
                    return true;
                },
                tQ: function(Vg) {
                    this.VW++;
                    this.uj[this.VW] = Vg;
                    this.PR++;
                    var LT = {};
                    LT.TD = ls.rG.Ne;
                    LT.df = this.VW;
                    return LT;
                },
                EZ: function(DY, Ax, xI) {
                    if (this.uj[DY]) {
                        var Vg = this.uj[DY];
                        if (Ax == 1) {
                            Jp = "onProcessed";
                        } else if (Ax == 38) {
                            Jp = "onDiscarded";
                        } else if (Ax == 30) {
                            Jp = "onAbort";
                        } else if (Ax <= 0) {
                            Jp = "onDeny";
                        } else {
                            Jp = "onError";
                        }
                        try {
                            if (Ax <= 0) {
                                Vg.onDeny(Ax, xI);
                            } else {
                                Vg[Jp]();
                            }
                        } catch (Wq) {
                            this.BF.CP(Wq, Jp);
                        }
                        delete this.uj[DY];
                        this.PR--;
                    }
                },
                XZ: function() {
                    var eC = {};
                    var df = 0;
                    for (var GN = this.VW; GN >= 0; GN--) {
                        if (df == this.PR) {
                            break;
                        }
                        if (this.uj[GN]) {
                            eC[df] = GN;
                            df++;
                        }
                    }
                    for (var GN = df - 1; GN >= 0; GN--) {
                        this.EZ(eC[GN], 30, null);
                    }
                    this.BF.kw(this.PR == 0, 'XZ');
                    this.VW = -1;
                    this.uj = {};
                    this.PR = 0;
                },
                Lm: function() {
                    for (var GN in this.ZZ) {
                        this.ZZ[GN].Lm();
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.VT = function(Qj) {
                this.jF = false;
                this.Th = false;
                this.BH = this.ak(Qj);
                this.Mu = 1000;
                this.mo = false;
                this.BF = ls.kZ.getLogger("LC");
                this.JN();
            };
            ls.VT.prototype = {
                ak: function(Qj) {
                    var Yt = this;
                    return function() {
                        if (Yt.jF) {
                            return;
                        }
                        Yt.Th = true;
                        if (Qj && Qj.length) {
                            for (var GN = 0; GN < Qj.length; GN++) {
                                try {
                                    Qj[GN]();
                                } catch (Wq) {
                                    this.BF.CP(Wq, 'BH', Qj[GN]);
                                }
                            }
                        }
                        Yt.Th = false;
                        Yt.jF = true;
                    };
                },
                Xc: function() {
                    return !(this.jF || this.Th);
                },
                JN: function() {
                    if (document && typeof document.readyState != "undefined") {
                        var tb = document.readyState;
                        if (tb.toUpperCase() == "COMPLETE") {
                            this.BF.log('JN', 1);
                            this.bP();
                            return;
                        } else {
                            this.BF.log('JN', 2);
                            ls.FD.fx(this.wW, this.Mu, this);
                        }
                    } else if (this.VK()) {
                        this.BF.log('JN', 3);
                        this.bP();
                        return;
                    }
                    if (typeof window.OpenAjax != "undefined") {
                        if (typeof OpenAjax.addOnLoad != "undefined") {
                            this.BF.log('JN', 4);
                            OpenAjax.addOnLoad(this.BH, null, "library");
                            return;
                        }
                    }
                    var wM = ls.xL("load", this.BH);
                    if (!wM) {
                        this.BF.log('JN', 5);
                        this.bP();
                    } else if (ls.tj()) {
                        var HF = true;
                        if (!ls.xL("DOMContentLoaded", this.HP())) {
                            this.BF.log('JN', 6);
                            HF = false;
                        } else {
                            this.BF.log('JN', 7, window.opera.version);
                            if (ls.tj(7, true)) {
                                return;
                            } else if (ls.tj(8, true)) {
                                HF = false;
                            }
                        }
                        ls.FD.fx(this.xk, this.Mu, this, [HF]);
                    }
                },
                bP: function() {
                    ls.FD.fx(this.BH, 0);
                },
                wW: function() {
                    if (!this.jF) {
                        var tb = document.readyState;
                        if (tb.toUpperCase() == "COMPLETE") {
                            this.BH();
                        } else {
                            ls.FD.fx(this.wW, this.Mu, this);
                        }
                    }
                },
                xk: function(HF) {
                    if (!this.jF) {
                        if (this.tA || !HF && this.VK()) {
                            if (ls.AD && ls.AD.xb) {
                                this.mo = true;
                                return;
                            }
                            this.BH();
                        } else {
                            ls.FD.fx(this.xk, this.Mu, this, [HF]);
                        }
                    }
                },
                HP: function() {
                    var Yt = this;
                    return function() {
                        Yt.tA = true;
                    };
                },
                VK: function() {
                    return (typeof document.getElementsByTagName != "undefined" && typeof document.getElementById != "undefined" && (document.getElementsByTagName("body")[0] != null || document.body != null));
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.ZY = function() {
                this.KB = false;
                this.Kp = null;
                this.Ok = 0;
                this.BF = ls.kZ.getLogger("EL");
            };
            ls.ZY.prototype = {
                Ce: function(il) {
                    this.BF.log('Ce', ls.AD.IZ.Eh, ls.AD.Dh);
                    if ((ls.AD.IZ.Eh.Dh || ls.AD.Dh)) {
                        if (ls.AD.IZ.Eh.PB == "S") {
                            this.KB = true;
                            var cP = ls.gQ();
                            if (this.Kp === null || cP - this.Kp >= 2000) {
                                this.Kp = cP;
                                var PJ = ls.vb();
                                this.BF.log('Ce', 2, PJ);
                                this.Ok++;
                                ls.FD.fx(this.Vf, PJ, this);
                                ls.AD.CY(ls.AD.CS, null);
                            }
                        } else if (il) {
                            this.BF.log('Ce', 3);
                        }
                    }
                },
                Vf: function() {
                    this.Ok--;
                    this.BF.log('Vf', 1);
                    IJ = ls.AD.Dh ? ls.AD.Dh : ls.AD.IZ.Eh.Dh;
                    ls.AD.tH(ls.AD.CS, IJ, ls.AD.IZ.Eh.PB, ls.AD.IZ.Eh.or, true);
                },
                si: function() {
                    this.KB = false;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.fN = function() {};
            ls.fN.prototype = {
                nG: function(Pg, ud) {
                    this.BF.QA('nG', arguments);
                    if (Pg == 6) {
                        var jf = ls.jD.fXg(ud);
                        if (jf) {
                            jf.icu();
                        }
                    } else if (Pg == 7) {} else if (Pg == 8) {} else if (Pg == 9) {
                        var Yn = ls.jD.fXg(ud);
                        if (Yn && Yn.hX) {
                            if (ls.AD && ls.AD.IZ && ls.AD.IZ.getStatus() == ls.NU) {
                                Yn.fr *= 2;
                                Yn.fr += 500;
                            }
                            ls.FD.HT(Yn.hX, Yn.fr);
                            delete(Yn.hX);
                            delete(Yn.fr);
                        }
                    }
                },
                qc: function(Pg, xI, ud) {
                    this.BF.QA('qc', arguments);
                    this.Oc = true;
                    var sJ = ls.jD.fXg(ud);
                    if (!sJ) {
                        return;
                    }
                    var Kk;
                    var xd;
                    var kt;
                    if (sJ.hv == ls.pY) {
                        xd = sJ.tw;
                        kt = sJ.eY.ev;
                        sJ = sJ.oT;
                        Kk = sJ.eY.wp(xd);
                    }
                    if (ls.AD.onServerDeny) {
                        try {
                            ls.AD.onServerDeny(Pg, xI, sJ, xd, Kk, kt);
                        } catch (Wq) {
                            this.BF.Ek(Wq, ls.AD.onServerDeny, "onServerDeny");
                        }
                    }
                },
                onLostUpdates: function(wF) {
                    this.BF.QA("onLostUpdates", arguments);
                    var ud = wF[0];
                    var bM = wF[1];
                    var Om = wF[2];
                    var sJ = ls.jD.fXg(ud);
                    if (!sJ) {
                        return false;
                    }
                    var kt;
                    if (sJ.hv == ls.pY) {
                        kt = sJ.eY.ev;
                        bM = sJ.tw;
                        sJ = sJ.oT;
                    }
                    if (sJ.onLostUpdates) {
                        var qs = sJ.eY.wp(bM);
                        try {
                            sJ.onLostUpdates(bM, Om, qs, kt);
                        } catch (MU) {
                            this.BF.Ek(Wq, sJ.onLostUpdates, "onLostUpdates");
                        }
                    }
                    return true;
                },
                onEndOfSnapshot: function(wF) {
                    this.BF.QA("onEndOfSnapshot", arguments);
                    var ud = wF[0];
                    var bM = wF[1];
                    var sJ = ls.jD.fXg(ud);
                    if (!sJ) {
                        return false;
                    }
                    if (sJ.hv.indexOf(ls.iw) > -1) {
                        sJ.jB = true;
                    }
                    if (sJ.onEndOfSnapshot) {
                        var qs = sJ.eY.wp(bM);
                        try {
                            sJ.onEndOfSnapshot(bM, qs);
                        } catch (Wq) {
                            this.BF.Ek(Wq, sJ.onEndOfSnapshot, "onEndOfSnapshot");
                        }
                    }
                    return true;
                }
            };
            ls.Ou(ls.Sg, ls.fN);
        })(Lightstreamer);
        (function(ls) {
            var Hi = 'cx';
            ls.ku = function() {
                this.rj = new ls.hS(null);
                this.WS = {};
                this.Sx = {};
                this.Wu = 0;
                this.rk = false;
                this.Iv = 5000;
                this.AH = false;
                this.bk = 0;
                this.nJ = 0;
                this.Al = false;
                this.Oa = true;
                this.XT = false;
                this.tV = -1;
                ls.FD.lD(this.iK, 60000, this);
                this.BF = ls.kZ.getLogger("EP");
                this.XR = ls.kZ.getLogger("CE");
            };
            ls.ku.prototype = {
                KG: function() {
                    if (!ls.AD) {
                        return null;
                    }
                    if (this.rj.Vl != null) {
                        var Sc = this.rj.HS(true);
                        this.XR.log('KG', 1, Sc.log);
                        if (this.rj.Vl !== null) {
                            return this.rj.Vl;
                        } else {
                            return null;
                        }
                    } else {
                        return null;
                    }
                },
                KA: function() {
                    var hl = null;
                    var md = ls.AD;
                    if (ls.ZK() && md.bq) {
                        this.rj.Vl = md.XG;
                        this.BF.log('KA', 1);
                    } else if ((this.Al || md.XG == null) && this.Oa && !md.xb) {
                        hl = this.pU();
                        this.BF.log('KA', 2, hl);
                        this.Al = false;
                    } else if (md.XG != null) {
                        this.rj.Vl = md.XG;
                        this.BF.log('KA', 3);
                        this.Al = true;
                    } else {
                        if (this.Wu == 10) {
                            if (!this.rk) {
                                this.BF.aG("No way to find the Engine. Please check your configuration", "seekEngine");
                            }
                        }
                        if (this.Wu <= 10) {
                            this.Wu++;
                        }
                        this.BF.log('KA', 4, this.Wu);
                        return null;
                    }
                    var Sc = this.rj.HS(true, !md.xb);
                    this.BF.log('KA', 5, Sc.log);
                    if (this.rj.Vl != null) {
                        this.nJ = 0;
                        try {
                            this.WS[this.rj.Vl.gA.getEngineFrameName()] = "OK";
                            return this.rj.Vl;
                        } catch (Wq) {
                            this.BF.log('KA', 10);
                        }
                    }
                    if (ls.tj() && md.foi() && hl && hl.log == "null") {
                        this.BF.log('KA', 6);
                        md.OOs();
                        return null;
                    }
                    this.nJ++;
                    if (this.nJ >= (md.xb ? 20 : 10)) {
                        this.nJ = 0;
                        if (ls.bI.KB) {
                            this.BF.log('KA', 7);
                            ls.bI.Ce();
                        } else if (md.foi() && this.YI() && !md.xb) {
                            this.BF.log('KA', 8);
                            md.OOs();
                        } else {
                            this.BF.log('KA', 9);
                            this.AH = true;
                        }
                    }
                    return null;
                },
                YI: function() {
                    if (ls.ms(2) && this.cW) {
                        this.BF.log('YI', 1);
                        return true;
                    } else if (ls.tj()) {
                        this.BF.log('YI', 2);
                        return true;
                    } else if (ls.tK()) {
                        this.BF.log('YI', 3);
                        return true;
                    }
                },
                pU: function() {
                    var DB = this.cx();
                    if (!DB) {
                        this.BF.log('pU', 1);
                        return false;
                    }
                    var YA = DB[2];
                    var VS = this.rj.Cf(YA, ls.AD.xb);
                    if (VS === false || (!VS.No && VS.dO == false)) {
                        this.WS[YA] = false;
                    } else {
                        this.WS[YA] = VS.log ? VS.log : "unknown";
                    }
                    this.BF.log('pU', 3, YA, VS.log);
                    if (DB[3] && DB[3] != location.host) {
                        this.cW = true;
                    }
                    return VS;
                },
                cx: function() {
                    if (!ls.pW) {
                        this.BF.log(Hi, 1);
                        return null;
                    }
                    var KC = ls.tu + (ls.AD.nl ? ls.We : 0);
                    var bo = ls.QX(ls.EJ + ls.AD.CS);
                    if (!bo) {
                        this.BF.log(Hi, 2);
                        return null;
                    }
                    for (var GN = 0; GN < bo.length; GN++) {
                        var FS = bo[GN] + "_" + ls.AD.CS;
                        var LD = ls.QX(ls.EJ + FS);
                        if (!LD || LD.length <= 2) {
                            this.BF.log(Hi, 3, bo[GN]);
                            continue;
                        }
                        if (LD[1] != "S" && !this.XT) {
                            this.BF.log(Hi, 4, bo[GN], LD[1]);
                            continue;
                        }
                        if (this.WS[LD[2]]) {
                            this.BF.log(Hi, 5, bo[GN], LD[2]);
                            continue;
                        }
                        var Od = ls.gQ();
                        var LJ = Od - parseInt(LD[0]);
                        var ad = 1000 - LJ;
                        if (LJ > KC) {
                            if (this.Sx[FS]) {
                                if (LJ > ls.tu * 2) {
                                    this.Sx[FS] = null;
                                    this.BF.log(Hi, 6.1, bo[GN], LJ);
                                } else {
                                    this.Sx[FS] = LD[0];
                                    ls.AD.LvQ(ad);
                                    this.BF.log(Hi, 6.2, bo[GN], LJ);
                                }
                            } else {
                                this.BF.log(Hi, 6, bo[GN], LJ);
                            }
                            continue;
                        }
                        if (ls.AD.nl) {
                            if (!this.Sx[FS]) {
                                this.BF.log(Hi, 7, LD[0], LJ);
                                this.Sx[FS] = LD[0];
                                ls.AD.LvQ(ad);
                                continue;
                            } else {
                                if (this.Sx[FS] == LD[0]) {
                                    this.BF.log(Hi, 8, LD[0], LJ);
                                    ls.AD.LvQ(ad);
                                    continue;
                                }
                            }
                        }
                        ls.Dl = Od;
                        ls.gD = ls.tu - LJ;
                        if (LJ > 100) {
                            this.BF.log(Hi, 9, LJ);
                        }
                        this.BF.log(Hi, 10, bo[GN], LD);
                        return LD;
                    }
                    return null;
                },
                Ev: function() {
                    if (this.IL) {
                        return;
                    }
                    this.BF.log('Ev');
                    this.IL = ls.FD.lD(this.NL, this.Iv, this);
                },
                aZ: function() {
                    this.BF.log('aZ');
                    ls.FD.vL(this.IL);
                    delete(this.IL);
                },
                NL: function() {
                    this.XR.QA('NL');
                    if (ls.rG.kh) {
                        var gA = this.KG();
                        if (gA === null) {
                            this.BF.log('NL', 1);
                            ls.rG.St();
                            return false;
                        }
                        this.XR.log('NL', 2);
                        return ls.rG.TjM();
                    }
                    return false;
                },
                hm: function(Pq) {
                    if (ls.CR.rk) {
                        return;
                    }
                    if (this.AH && Pq == this.bk) {
                        if (!ls.rG.kh) {
                            var DL;
                            if (ls.AD.xb) {
                                DL = "Unable to create the Engine.";
                            } else {
                                DL = "Unable to find the Engine. ";
                            }
                            if (ls.AD.foi()) {
                                DL += "Creating a new Engine.";
                            } else {
                                DL += "Retrying. If the problem persists, please check your configuration.";
                            }
                            this.BF.aG(DL, "bind");
                            ls.AD.OOs();
                        }
                    }
                },
                pg: function() {
                    this.AH = false;
                    ls.FD.fx(this.hm, 20000, this, [new Number(++this.bk)]);
                },
                iK: function() {
                    var Uq = document.cookie.toString();
                    this.Lc(Uq);
                    this.LM(Uq);
                },
                Lc: function(Uq) {
                    var Uv = this.WS;
                    this.WS = {};
                    for (var co in Uv) {
                        if (Uv[co] && Uq.indexOf(co) > -1) {
                            this.WS[co] = Uv[co];
                        }
                    }
                },
                LM: function(Uq) {
                    var kR = this.Sx;
                    this.Sx = {};
                    for (var co in kR) {
                        if (kR[co] && Uq.indexOf(co) > -1) {
                            this.Sx[co] = kR[co];
                        }
                    }
                },
                Fx: function(Vp) {
                    var gA = this.KG();
                    if (gA != null) {
                        try {
                            gA.document.bgColor = Vp;
                            var cH = gA.document.bgColor;
                            return cH;
                        } catch (hL) {}
                    }
                    return null;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.UpdateItemInfo = function() {
                this.BF = ls.kZ.getLogger("IC");
            };
            Lightstreamer.UpdateItemInfo.prototype = {
                Kj: function(qo, uu, wF, LN) {
                    this.Gp = wF;
                    this.qo = qo;
                    this.uu = uu;
                    this.LN = LN;
                },
                isValueChanged: function(field) {
                    this.BF.log("isValueChanged", arguments);
                    var WJ = this.qo.ac.Kq(field);
                    return this.lB(WJ, this.qo.ac.gv(WJ));
                },
                lB: function(WJ, UF) {
                    if (!UF) {
                        if (this.Gp[WJ + 1] == null) {
                            return true;
                        } else {
                            return (this.Gp[WJ + 1].length > -1);
                        }
                    } else if (this.qo.Fw.US(this.uu)) {
                        var jH = "";
                        if (this.qo.Fw.Fe(this.uu, WJ)) {
                            jH = WJ;
                        } else if (this.qo.Fw.Fe(this.uu, WJ + "|rem")) {
                            jH = WJ + "|rem";
                        }
                        if (jH != "") {
                            if (this.qo.Fw.Fe(this.uu, jH) != this.qo.qM.Fe(this.uu, WJ)) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                    if (this.qo.qM.Fe(this.uu, WJ)) {
                        return true;
                    } else {
                        return false;
                    }
                },
                isSnapshot: function() {
                    this.BF.log("isSnapshot", arguments);
                    return this.LN;
                },
                getNewValue: function(field) {
                    this.BF.log("getNewValue", arguments);
                    var WJ = this.qo.ac.Kq(field);
                    var UF = this.qo.ac.gv(WJ);
                    if (this.lB(WJ, UF)) {
                        if (!UF) {
                            return this.Gp[WJ + 1];
                        } else {
                            if (!this.qo.Fw.US(this.uu)) {
                                return null;
                            }
                            var Mo = this.qo.Fw.Fe(this.uu, WJ);
                            var Uw = (Mo) ? Mo : this.qo.Fw.Fe(this.uu, WJ + "|rem");
                            if (!Uw) {
                                return null;
                            } else {
                                return Uw;
                            }
                        }
                    } else {
                        return this.qn(WJ);
                    }
                },
                getOldValue: function(field) {
                    this.BF.log("getOldValue", arguments);
                    var WJ = this.qo.ac.Kq(field);
                    return this.qn(WJ);
                },
                qn: function(WJ) {
                    return this.qo.qM.Fe(this.uu, WJ);
                },
                getNumFields: function() {
                    if (this.qo.Ts) {
                        if (this.qo.Ts.length == 0) {
                            return null;
                        } else {
                            this.qo.ac.length + this.qo.Ts.length;
                        }
                    }
                    return this.qo.ac.length;
                },
                addField: function(field, value, gR) {
                    this.BF.log("addField", arguments);
                    if (typeof gR == "undefined") {
                        gR = true;
                    }
                    var WJ = this.qo.ac.Kq(field);
                    if (!this.qo.ac.gv(WJ)) {
                        var vV = this.getNumFields();
                        if (vV == null) {
                            vV = this.qo.ac.length;
                        }
                        this.BF.kE("addField() method can only add fields that are not part of the subscription schema. Please use a value greater than " + vV, "addField");
                    }
                    if (gR) {
                        this.qo.Fw.fS(value, this.uu, WJ + "|rem");
                    } else {
                        this.qo.Fw.fS(value, this.uu, WJ);
                        this.qo.Fw.rA(this.uu, WJ + "|rem");
                    }
                },
                forEachChangedField: function(Bk) {
                    var ch = this.Gp.Yj;
                    for (var GN = 0; GN < ch.length; GN++) {
                        var name = this.qo.ac.we(ch[GN]);
                        var Dv = this.qn(ch[GN]);
                        var lU = this.Gp[ch[GN] + 1];
                        try {
                            Bk(ch[GN], name, Dv, lU, this);
                        } catch (Wq) {
                            this.BF.Ek(Wq, Bk, "forEachChangedField");
                        }
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.VisualUpdateInfo = function() {
                this.Dk = null;
                this.pE = 1200;
                this.LK = 0;
                this.xm = 0;
                this.BF = ls.kZ.getLogger("IC");
            };
            Lightstreamer.VisualUpdateInfo.prototype = {
                sD: ls.jI,
                Kj: function(qo, uu, wF, xD) {
                    this.Gp = wF;
                    this.xD = xD;
                    this.qo = qo;
                    this.uu = uu;
                    this.df = uu;
                    this.pE = 1200;
                    this.LK = 0;
                    this.xm = 0;
                },
                getFormattedValue: function(field) {
                    var WJ = this.qo.ac.Kq(field);
                    var SA = this.qo.ej.Fe(this.uu, WJ);
                    return SA;
                },
                setFormattedValue: function(field, value) {
                    var WJ = this.qo.ac.Kq(field);
                    this.qo.ej.fS(value, this.uu, WJ);
                },
                getServerValue: function(field) {
                    var WJ = this.qo.ac.Kq(field);
                    if (this.xD) {
                        if (typeof(WJ) == "number") {
                            return this.Gp[WJ + 1];
                        } else {
                            return this.Gp[WJ];
                        }
                    } else if (!this.qo.ac.gv(WJ)) {
                        if (this.Gp[WJ + 1] == null || this.Gp[WJ + 1].length > -1) {
                            return this.Gp[WJ + 1];
                        }
                    }
                    return this.qo.qM.Fe(this.uu, WJ);
                },
                setHotTime: function(gH) {
                    this.pE = this.sD(gH, "setHotTime", 1200, true, 0);
                },
                setColdToHotTime: function(gH) {
                    if (this.qo.hv != ls.Nr && this.qo.hv != ls.LW) {
                        this.LK = this.sD(gH, "setColdToHotTime", 0, true, 0);
                    } else {
                        this.LK = 0;
                    }
                },
                setHotToColdTime: function(gH) {
                    if (this.qo.hv != ls.Nr && this.qo.hv != ls.LW) {
                        this.xm = this.sD(gH, "setHotToColdTime", 0, true, 0);
                    } else {
                        this.xm = 0;
                    }
                },
                RN: function(WJ, cQ, jv, Eo) {
                    this.BF.log('RN', arguments);
                    var Ex = this.qo.JH[WJ];
                    if (Ex == null) {
                        return;
                    }
                    var vq = this.qo.NT.Auv(this.Dk, Ex);
                    if (vq == null) {
                        return;
                    }
                    cQ = (cQ) ? cQ : "";
                    jv = (jv) ? jv : "";
                    if (vq.FW == null) {
                        vq.FW = {};
                        vq.sq = {};
                    }
                    vq.FW[Eo] = cQ;
                    vq.sq[Eo] = jv;
                },
                setRowAttribute: function(cQ, jv, Jd) {
                    this.Sn(cQ, jv, Jd);
                },
                setRowStyle: function(Na, qH) {
                    this.Sn(Na, qH, "CLASS");
                },
                setAttribute: function(field, cQ, jv, Jd) {
                    var WJ = this.qo.ac.Kq(field);
                    this.RN(WJ, cQ, jv, Jd);
                    if (this.qo.hv == ls.Nr || this.qo.hv == ls.LW) {
                        var DX = this.qo.NT;
                        var Ex = this.qo.JH[WJ];
                        if (Ex == null) {
                            return;
                        }
                        var mP = DX.sZ.Fe(this.Dk, Ex);
                        if (!mP) {
                            mP = {};
                            DX.sZ.fS(mP, this.Dk, Ex);
                        }
                        mP[Jd] = 1;
                    }
                },
                setStyle: function(field, Na, qH) {
                    var WJ = this.qo.ac.Kq(field);
                    this.RN(WJ, Na, qH, "CLASS");
                },
                Sn: function(cQ, jv, Eo) {
                    var Am = this.Dk;
                    cQ = (cQ) ? cQ : "";
                    jv = (jv) ? jv : "";
                    var Ss = this.qo.NT;
                    Ss.pJ.fS(cQ, Am, Eo);
                    Ss.ge.fS(jv, Am, Eo);
                    if (this.qo.hv == ls.Nr || this.qo.hv == ls.LW) {
                        if (Eo != "CLASS") {
                            if (!Ss.sb.Fe(Am, Eo)) {
                                Ss.sb.fS(1, Am, Eo);
                            }
                        }
                    }
                },
                forEachChangedField: function(Bk) {
                    var ch = this.qo.aP;
                    for (var GN = 0; GN < ch.length; GN++) {
                        var name = this.qo.ac.we(ch[GN]);
                        var oH = this.qo.ej.Fe(this.uu, ch[GN]);
                        var Cm = typeof(ch[GN]) == "number" ? this.Gp[ch[GN] + 1] : this.Gp[ch[GN]];
                        if (typeof(Cm) == "undefined") {
                            Cm = this.qo.qM.Fe(this.uu, ch[GN]);
                        }
                        if (Cm && Cm.length <= -1 && (this.qo.hv == ls.oa || this.qo.hv == ls.Nr)) {
                            Cm = this.qo.qM.Fe(this.uu, ch[GN]);
                        }
                        try {
                            Bk(ch[GN], name, Cm, oH, this);
                        } catch (Wq) {
                            this.BF.Ek(Wq, Bk, "forEachChangedField");
                        }
                    }
                }
            };
        })(Lightstreamer);
        Lightstreamer.RowInfo = function() {};
        Lightstreamer.RowInfo.prototype = {
            Kj: function(sJ, uu, Zs) {
                this.qo = sJ;
                this.uu = uu;
                if (Zs) {
                    this.Zs = Zs;
                } else {
                    this.Zs = this.qo.NT.IP[uu];
                }
            },
            getServerValue: function(field) {
                var oG = field;
                var DX = this.qo.NT;
                var WJ = this.qo.ac.Kq(oG);
                var Ex = this.qo.JH[WJ];
                if (Ex == null) {
                    return null;
                }
                var Sb = DX.tN.Fe(this.Zs, Ex);
                if (!Sb) {
                    return null;
                }
                return Sb;
            },
            getCellValue: function(field) {
                var oG = field;
                var DX = this.qo.NT;
                var WJ = this.qo.ac.Kq(oG);
                var Ex = this.qo.JH[WJ];
                if (Ex == null) {
                    return null;
                }
                var er = DX.eN.Fe(this.Zs, Ex);
                if (er === null) {
                    return DX.vj.Fe(this.Zs, Ex);
                }
                return er;
            }
        };
        (function(ls) {
            ls.wB = function() {};
            ls.wB.prototype = {
                QC: function(gH, sR, JR, wI) {
                    var bh = "Lightstreamer|temp|id";
                    var Qx = 0;
                    while (document.getElementById(bh) && Qx < 100) {
                        bh += ls.vb();
                        Qx++;
                    }
                    JR = JR || "div";
                    var uf = "<" + JR + " id='" + bh + "'";
                    if (sR) {
                        uf += " class='" + sR + "'";
                    }
                    uf += ">" + gH + "</" + JR + ">";
                    document.write(uf);
                    var KN = document.getElementById(bh);
                    KN.removeAttribute("id");
                    return new ls.qu(KN, wI);
                },
                aT: function(Rx) {
                    var nP = this.JG(Rx).tke();
                    for (var Dk in nP) {
                        var hw = nP[Dk];
                        var lq = false;
                        for (var oG in hw) {
                            var Ph;
                            var tg = hw[oG];
                            var ZX = tg.KE();
                            if (ZX) {
                                lq = true;
                            } else {
                                delete hw[oG];
                            }
                        }
                        if (!lq) {
                            delete nP[Dk];
                        }
                    }
                },
                ML: function(Cp, Ck) {
                    if (Cp["CLASS"]) {
                        return Cp;
                    } else {
                        for (var Eo in Ck) {
                            if (!Cp[Eo]) {
                                Cp[Eo] = Ck[Eo];
                            }
                        }
                        return Cp;
                    }
                },
                WR: function(Cs, uu, cj, df, oG, rb, uO) {
                    var sJ = ls.jD.gba(Cs);
                    if (!sJ || uO != sJ.uO) {
                        return;
                    }
                    var ZL = sJ.NT;
                    if ((ZL.hv == ls.Nr || ZL.hv == ls.LW) && ZL.IP) {
                        cj = ZL.IP[df];
                    }
                    var gH = null;
                    var Dk = cj;
                    var Ex = sJ.JH[oG];
                    if (Ex == null) {
                        return;
                    }
                    if (sJ.hv == ls.oa) {
                        var vq = ZL.Auv(Dk, Ex);
                        if (vq) {
                            gH = vq.TG;
                            vq.TG = null;
                        }
                    }
                    var QJ = false;
                    if (gH == null) {
                        var xO = sJ.ej.Fe(uu, oG);
                        if (xO == null) {
                            if (!rb) {
                                return false;
                            } else {
                                gH = ZL.vj.Fe(cj, Ex);
                                QJ = true;
                            }
                        } else {
                            gH = xO;
                        }
                    }
                    sJ.Ya.rA(uu, oG);
                    var dZ = gH;
                    if (dZ == "") {
                        dZ = ls.vX;
                    }
                    var LL = ZL.EA.US(cj);
                    this.mx(Cs, Dk, Ex, dZ, ls.ml, LL, QJ);
                    return true;
                },
                mx: function(Cs, cj, Ex, gH, Xn, Lo, Wt) {
                    var ZL = this.JG(Cs);
                    var Mn = Wt ? true : ZL.Mn;
                    var vq = ZL.Auv(cj, Ex);
                    if (vq == null) {
                        return true;
                    }
                    var gt = null;
                    var hK = null;
                    if (Xn == ls.ml) {
                        gt = vq.Qh;
                        vq.Qh = null;
                    } else if (Xn == ls.Qi || Xn == ls.PT) {
                        gt = vq.oD;
                        vq.oD = null;
                        vq.Qh = null;
                    }
                    if (Xn == ls.PT) {
                        var wD = ZL.Ia.Fe(cj, Ex);
                        if (gt == null && wD) {
                            gt = {};
                            gt["CLASS"] = wD;
                        } else if (wD) {
                            gt["CLASS"] = wD;
                        }
                    }
                    if (gt != null) {
                        gt = this.ML(gt, Lo);
                    } else if (Lo) {
                        gt = Lo;
                    }
                    if (gt != null) {
                        if (typeof gt["CLASS"] != "undefined") {
                            hK = gt["CLASS"];
                        }
                    }
                    vq.Tr(gH, Mn);
                    vq.YB(hK);
                    vq.aO(gt);
                    return true;
                },
                us: function(Cs, cj, df, Ex, hg, HM) {
                    var Oi = this.JG(Cs);
                    if ((Oi.hv == ls.Nr || Oi.hv == ls.LW) && Oi.IP) {
                        cj = Oi.IP[df];
                    }
                    var vq = Oi.Auv(cj, Ex);
                    if (vq == null) {
                        return;
                    }
                    if (vq.HM != HM) {
                        return;
                    }
                    var Lo = null;
                    if (hg) {
                        Lo = Oi.EA.US(cj);
                    } else {
                        Lo = Oi.tW.US(cj);
                    }
                    var gt = null;
                    var hK = null;
                    if (hg) {
                        gt = vq.Qh;
                        vq.Qh = null;
                    } else {
                        gt = vq.oD;
                        vq.oD = null;
                    }
                    if (gt != null) {
                        gt = this.ML(gt, Lo);
                    } else if (Lo) {
                        gt = Lo;
                    }
                    if (gt != null) {
                        if (typeof gt["CLASS"] != "undefined") {
                            hK = gt["CLASS"];
                        }
                    } else {
                        return true;
                    }
                    vq.YB(hK);
                    vq.aO(gt);
                    return true;
                }
            };
            ls.Ou(ls.Sg, ls.wB);
        })(Lightstreamer);
        (function(ls) {
            ls.Tj = function(vq, SE, sh, Eg, lQ, Pq, RM) {
                this.Kj(vq, SE, sh, Eg, lQ, Pq, RM);
            };
            ls.Tj.prototype = {
                Kj: function(vq, SE, sh, Eg, lQ, Pq, RM) {
                    this.RM = (RM) ? RM : null;
                    this.SE = SE;
                    this.vq = vq;
                    this.sh = (sh) ? ls.VG.IW(sh) : null;
                    this.Eg = (Eg) ? ls.VG.IW(Eg) : null;
                    this.lQ = lQ;
                    this.Pq = Pq;
                    this.vh = 0;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.qS = function() {
                this.length = 0;
                this.rc = {};
            };
            ls.qS.prototype = {
                HO: function(Rx) {
                    this.rc[this.length] = Rx;
                    this.length++;
                },
                Fe: function() {
                    if (this.length <= 0) {
                        return null;
                    }
                    this.length--;
                    return this.rc[this.length];
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.CF = function(xo) {
                this.mT = xo;
                this.QW = new ls.qS();
                this.VV = 0;
                this.ro = {};
                this.Io = false;
                this.nT = {};
            };
            ls.CF.prototype = {
                mI: function(vq, SE, sh, Eg, FR, RM) {
                    var lQ = this.OC(FR);
                    var jJ = ++vq.xQ;
                    var HL = this.QW.Fe();
                    if (HL == null) {
                        this.ro[this.VV] = new ls.Tj(vq, SE, sh, Eg, lQ, jJ, RM);
                        return this.VV++;
                    } else {
                        this.ro[HL].Kj(vq, SE, sh, Eg, lQ, jJ, RM);
                        return HL;
                    }
                },
                OC: function(Rk) {
                    var lQ = Rk / this.mT;
                    return (lQ > 1) ? lQ : 1;
                },
                Of: function(Rx) {
                    var UH = this.ro[Rx];
                    if (UH.Pq < UH.vq.xQ) {
                        return;
                    }
                    var RR = this.nT[UH.vq.sf];
                    var TM = this.ro[RR];
                    if (TM) {
                        if (!TM.SE) {
                            if (UH.SE) {
                                if (TM.RM) {
                                    ls.FD.bu(TM.RM);
                                }
                            } else {
                                UH.vh = TM.vh;
                                if (UH.lQ < TM.lQ) {
                                    UH.lQ = TM.lQ;
                                }
                            }
                        }
                        this.QW.HO(RR);
                    }
                    this.nT[UH.vq.sf] = Rx;
                    if (UH.sh) {
                        UH.gc = ls.VG.Mi(UH.vq.jZ, "backgroundColor");
                    }
                    if (UH.Eg) {
                        UH.NH = ls.VG.Mi(UH.vq.jZ, "color");
                    }
                    if (!this.Io) {
                        this.uR(this.mT);
                    }
                },
                eF: function(vq) {
                    var RR = this.nT[vq.sf];
                    if (RR) {
                        delete(this.nT[vq.sf]);
                        this.QW.HO(RR);
                    }
                },
                kr: function(ZO) {
                    var CB = ls.gQ();
                    var WU = 0;
                    if (ZO) {
                        WU = CB - (ZO + this.mT);
                    }
                    var pq = false;
                    for (var RT in this.nT) {
                        var ai = this.nT[RT];
                        var UH = this.ro[ai];
                        if (UH.vh > UH.lQ) {
                            this.QW.HO(ai);
                            delete(this.nT[RT]);
                            if (UH.RM) {
                                ls.FD.HT(UH.RM, 0);
                            }
                        } else {
                            if (UH.sh) {
                                UH.vq.jZ.style.backgroundColor = "rgb(" + this.kM(UH.gc[0], UH.sh[0], UH.lQ, UH.vh) + "," + this.kM(UH.gc[1], UH.sh[1], UH.lQ, UH.vh) + "," + this.kM(UH.gc[2], UH.sh[2], UH.lQ, UH.vh) + ")";
                            }
                            if (UH.Eg) {
                                UH.vq.jZ.style.color = "rgb(" + this.kM(UH.NH[0], UH.Eg[0], UH.lQ, UH.vh) + "," + this.kM(UH.NH[1], UH.Eg[1], UH.lQ, UH.vh) + "," + this.kM(UH.NH[2], UH.Eg[2], UH.lQ, UH.vh) + ")";
                            }
                            pq = true;
                        }
                        UH.vh++;
                    }
                    if (!pq) {
                        this.Io = false;
                    } else {
                        var MT = ls.gQ();
                        var fE = (MT - CB);
                        var BY = fE + WU;
                        if (BY > this.mT) {
                            var TX = BY / this.mT;
                            var Sa = Math.floor(TX);
                            var Fv = TX - Sa;
                            this.jY(Sa);
                            BY = this.mT * Fv;
                        }
                        this.Sp(this.mT - BY, MT);
                    }
                },
                Sp: function(kN, ZO) {
                    ls.FD.fx(this.kr, kN, this, [ZO]);
                },
                jY: function(Sa) {
                    for (var RT in this.nT) {
                        var ai = this.nT[RT];
                        var UH = this.ro[ai];
                        if (UH.vh > UH.lQ) {} else if (UH.vh + Sa < UH.lQ) {
                            UH.vh += Sa;
                        } else {
                            UH.vh = UH.lQ;
                        }
                    }
                },
                uR: function(Sr) {
                    if (this.Io == true) {
                        return;
                    }
                    this.Io = true;
                    this.Sp(Sr);
                },
                kM: function(Qb, QB, WZ, BB) {
                    Qb = new Number(Qb);
                    QB = new Number(QB);
                    var Xg = QB - Qb;
                    var nF = Qb + (((1 / WZ) * BB) * Xg);
                    return Math.ceil(nF);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.HB = function(Bs, UY, ck, tZ, RM) {
                var HW;
                if (typeof RM == "string") {
                    HW = function() {
                        eval(RM);
                    };
                } else {
                    HW = RM;
                }
                var HK = ls.FD.mp(HW);
                var BD = new ls.qu(Bs);
                var UV = ls.Qv.mI(BD, false, UY, ck, tZ, HK);
                ls.Qv.Of(UV);
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Sl = function() {
                this.Xe = {};
                this.Hr = "An RGB color value must be in the form 'rgb(x, y, z)' or 'rgba(x, y, z, a)'. ";
                this.rR = " is not a valid color";
                this.Zc = " is not a valid value";
                this.BF = ls.kZ.getLogger("CC");
            };
            ls.Sl.prototype = {
                TT: function(Li) {
                    if ((Li >= 0) && (Li <= 9)) {
                        return new Number(Li);
                    }
                    Li = Li.toUpperCase();
                    if (Li == "A") {
                        return 10;
                    } else if (Li == "B") {
                        return 11;
                    } else if (Li == "C") {
                        return 12;
                    } else if (Li == "D") {
                        return 13;
                    } else if (Li == "E") {
                        return 14;
                    } else if (Li == "F") {
                        return 15;
                    } else {
                        this.BF.error("A hexadecimal number must contain numbers between 0 and 9 and letters between A and F. " + Li + this.Zc, "setStyle");
                        return null;
                    }
                },
                IW: function(gH) {
                    if (gH.indexOf("rgb") == 0) {
                        return this.kn(gH);
                    } else if (gH.indexOf("#") == 0) {
                        return this.Zd(gH);
                    } else {
                        return this.vR(gH);
                    }
                },
                Eb: function(EQ) {
                    var VS = 0;
                    var tk = 0;
                    var GN;
                    for (GN = EQ.length; GN >= 1; GN--) {
                        var FJ = this.TT(EQ.substring(GN - 1, GN));
                        if (FJ == null) {
                            return null;
                        }
                        var x;
                        for (x = 1; x <= tk; x++) {
                            FJ *= 16;
                        }
                        tk++;
                        VS += FJ;
                    }
                    return VS;
                },
                Zd: function(wn) {
                    if (wn.indexOf("#") == 0) {
                        wn = wn.substring(1, wn.length);
                    }
                    if (wn.length == 3) {
                        wn = wn.charAt(0) + wn.charAt(0) + wn.charAt(1) + wn.charAt(1) + wn.charAt(2) + wn.charAt(2);
                    } else if (wn.length != 6) {
                        this.BF.error("A hexadecimal color value must be 6 character long. " + wn + this.rR, "setStyle");
                        return null;
                    }
                    var cg = wn.substring(0, 2);
                    var pV = wn.substring(2, 4);
                    var Jt = wn.substring(4, 6);
                    Ln = this.Eb(cg);
                    jp = this.Eb(pV);
                    MB = this.Eb(Jt);
                    if (Ln == null || jp == null || MB == null) {
                        return null;
                    }
                    return [Ln, jp, MB];
                },
                nE: function(Vp) {
                    var FH = document.createElement("DIV");
                    FH.style.backgroundColor = Vp;
                    var gH = this.Mi(FH, "backgroundColor", Vp);
                    if (gH[0] == 255 && gH[1] == 255 && gH[2] == 255) {
                        if (Vp.toUpperCase() != "WHITE") {
                            var Ob = document.getElementsByTagName("BODY")[0];
                            if (Ob) {
                                Ob.appendChild(FH);
                                gH = this.Mi(FH, "backgroundColor", Vp);
                                Ob.removeChild(FH);
                            }
                        }
                    }
                    this.Xe[Vp] = gH;
                    return this.Xe[Vp];
                },
                vR: function(Vp) {
                    var VS = "";
                    if (this.Xe[Vp]) {
                        return this.Xe[Vp];
                    }
                    if (!ls.ZK()) {
                        return this.nE(Vp);
                    } else {
                        VS = ls.CR.Fx(Vp);
                    }
                    if (!VS || VS == "" || VS == Vp) {
                        var Su = document.bgColor;
                        document.bgColor = Vp;
                        VS = document.bgColor;
                        document.bgColor = Su;
                    }
                    if (!VS || VS == "" || VS == Vp) {
                        return this.nE(Vp);
                    }
                    this.Xe[Vp] = this.Zd(VS);
                    return this.Xe[Vp];
                },
                kn: function(np) {
                    var ld;
                    var wk;
                    if (np.indexOf("rgb(") == 0) {
                        ld = 4;
                        wk = ")";
                    } else if (np.indexOf("rgba(") == 0) {
                        ld = 5;
                        wk = ",";
                    } else {
                        this.BF.error(this.Hr + np + this.rR, "setStyle");
                        return null;
                    }
                    np = np.substring(ld, np.length);
                    var Oq = np.indexOf(",");
                    var Ln = this.ee(np.substring(0, Oq));
                    var wj = np.indexOf(",", Oq + 1);
                    var jp = this.ee(np.substring(Oq + 1, wj));
                    var cU = np.indexOf(wk, wj + 1);
                    var MB = this.ee(np.substring(wj + 1, cU));
                    if (Ln == null || jp == null || MB == null) {
                        return null;
                    }
                    return [Ln, jp, MB];
                },
                ee: function(eb) {
                    if (eb.indexOf("%") == eb.length - 1) {
                        eb = parseFloat(eb.substring(0, eb.length - 1));
                        if (eb > 100 | eb < 0) {
                            this.BF.error("An rgb element must be a number >=0 and <=255 or a percentile >=0 and <=100. " + eb + this.Zc, "setStyle");
                            return null;
                        }
                        eb = 2.55 * eb;
                    }
                    return eb;
                },
                Mi: function(FH, Xb, bT) {
                    if (FH == null) {
                        return [255, 255, 255];
                    }
                    var gH = "";
                    try {
                        if (window.getComputedStyle || (document.defaultView && document.defaultView.getComputedStyle)) {
                            var tL = document.defaultView.getComputedStyle(FH, null);
                            if (tL) {
                                var YV = Xb == "backgroundColor" ? "background-color" : Xb;
                                gH = tL.getPropertyValue(YV);
                            }
                        }
                    } catch (Wq) {}
                    try {
                        if (!this.ra(gH, bT) && FH.currentStyle) {
                            var gO = Xb == "background-color" ? "backgroundColor" : Xb;
                            gH = FH.currentStyle[gO];
                        }
                    } catch (Wq) {}
                    try {
                        if (!this.ra(gH, bT)) {
                            var AT = Xb == "background-color" ? "backgroundColor" : Xb;
                            if (FH.style[AT] != "") {
                                gH = FH.style[AT];
                            } else {
                                return [255, 255, 255];
                            }
                        }
                    } catch (Wq) {}
                    if (gH == "transparent" && FH.parentNode) {
                        return this.Mi(FH.parentNode, Xb);
                    } else if (gH == "transparent") {
                        return [255, 255, 255];
                    }
                    if (!this.ra(gH, bT)) {
                        return [255, 255, 255];
                    }
                    return this.IW(gH);
                },
                ra: function(iI, bT) {
                    if (!iI || iI == "") {
                        return false;
                    } else if (!bT) {
                        return true;
                    } else if (iI != bT) {
                        return true;
                    } else {
                        return false;
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.sU = function() {};
            ls.sU.prototype = {
                Kj: function() {
                    this.length = 0;
                    this.ZW = {};
                    if (!this.tF) {
                        this.Xk = {};
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Ht = function(Jb, oR, Vt) {
                this.uW(ls.Ht);
                this.pI = Jb;
                this.GM = oR;
                this.LH = Vt;
                this.tF = true;
                this.Kj();
            };
            ls.Ht.prototype = {
                removeChild: function(Jb) {
                    if (this.length <= 0) {
                        return;
                    }
                    this.length--;
                    delete(this.ZW[Jb.Rx]);
                    this.pI.removeChild(Jb.FC());
                    Jb.parentNode = null;
                },
                insertBefore: function(XE, Jb) {
                    if (Jb == XE) {
                        return;
                    }
                    if (!XE) {
                        return;
                    }
                    if (!Jb) {
                        this.appendChild(XE);
                        return;
                    }
                    if (this.ZW[Jb.Rx] == null) {
                        this.appendChild(XE);
                        return;
                    }
                    this.Lg(XE);
                    this.pI.insertBefore(XE.FC(), Jb.FC());
                },
                appendChild: function(Jb) {
                    if (!Jb) {
                        return;
                    }
                    this.Lg(Jb);
                    if (!this.GM) {
                        this.pI.appendChild(Jb.FC());
                    } else {
                        this.pI.insertBefore(Jb.FC(), this.GM);
                    }
                },
                Lg: function(Jb) {
                    if (Jb.parentNode == this) {
                        return;
                    }
                    this.length++;
                    this.ZW[Jb.Rx] = Jb;
                    if (Jb.parentNode) {
                        Jb.parentNode.removeChild(Jb);
                    }
                    Jb.parentNode = this;
                },
                Gl: function(Am) {
                    if (this.length <= Am) {
                        return null;
                    }
                    Am += this.LH;
                    var qI = this.pI.childNodes[Am].getAttribute("id");
                    return this.getElementById(qI);
                },
                getElementById: function(Rx) {
                    return this.ZW[Rx];
                },
                Lm: function() {
                    if (this.pI) {
                        delete(this.pI);
                    }
                    if (this.GM) {
                        delete(this.GM);
                    }
                    for (var GN in this.ZW) {
                        this.ZW[GN].Lm();
                    }
                }
            };
            ls.Ou(ls.Ht, ls.sU);
        })(Lightstreamer);
        (function(ls) {
            ls.KO = function() {
                this.uW(ls.KO);
                this.tF = false;
                this.Kj();
            };
            ls.KO.prototype = {
                removeChild: function(Jb) {
                    if (this.length <= 0) {
                        return;
                    }
                    this.length--;
                    var Am = this.ZW[Jb.Rx];
                    var So;
                    for (So = Am; So < this.length; So++) {
                        this.Xk[So] = this.Xk[So + 1];
                        this.ZW[this.Xk[So].Rx] = So;
                    }
                    this.ZW[Jb.Rx] = null;
                    this.Xk[this.length] = null;
                    Jb.parentNode = null;
                },
                insertBefore: function(XE, Jb) {
                    if (Jb == XE) {
                        return;
                    }
                    if (!XE) {
                        return;
                    }
                    if (!Jb) {
                        this.appendChild(XE);
                        return;
                    }
                    if (this.ZW[Jb.Rx] == null) {
                        this.appendChild(XE);
                        return;
                    }
                    if (XE.parentNode) {
                        XE.parentNode.removeChild(XE);
                    }
                    var PX = this.ZW[Jb.Rx];
                    for (So = this.length; So >= PX + 1; So--) {
                        this.Xk[So] = this.Xk[So - 1];
                        this.ZW[this.Xk[So].Rx] = So;
                    }
                    this.Lg(XE, PX);
                },
                appendChild: function(Jb) {
                    if (!Jb) {
                        return;
                    }
                    if (Jb.parentNode) {
                        Jb.parentNode.removeChild(Jb);
                    }
                    var Am = this.length;
                    this.Lg(Jb, Am);
                },
                Lg: function(Jb, Am) {
                    this.length++;
                    this.ZW[Jb.Rx] = Am;
                    this.Xk[Am] = Jb;
                    Jb.parentNode = this;
                    Jb.hN();
                },
                Gl: function(Am) {
                    return this.Xk[Am];
                },
                getElementById: function(Rx) {
                    return this.Xk[this.ZW[Rx]];
                },
                Lm: function() {
                    for (var GN = 0; GN < this.length; GN++) {
                        this.Xk[GN].Lm();
                    }
                }
            };
            ls.Ou(ls.KO, ls.sU);
        })(Lightstreamer);
        (function(ls) {
            ls.ix = function(lT, UR, nX, keyCode) {
                this.Rx = "a|" + lT + "|" + nX;
                this.Cs = lT;
                this.uu = nX;
                this.keyCode = keyCode;
                this.bM = UR;
                this.parentNode = null;
                this.Jb = null;
            };
            ls.ix.prototype = {
                hN: function() {
                    if (this.Jb == null) {
                        return;
                    }
                },
                FC: function() {
                    if (this.Jb != null) {
                        return this.Jb;
                    }
                    var DX = ls.fU.JG(this.Cs);
                    this.Jb = DX.Vn.cloneNode(true);
                    this.Jb.setAttribute("id", this.Rx);
                    var dl = ls.qu.PL(this.Jb);
                    for (var So = 0; So < dl.length; So++) {
                        var tg = dl[So];
                        var uD = tg.jZ.getAttribute("FIELD");
                        if (!uD) {
                            continue;
                        }
                        DX.lSC(tg, this.uu, uD, DX.hv);
                    }
                    return this.Jb;
                },
                Lm: function() {
                    if (this.Jb) {
                        delete(this.Jb);
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.iC = function(Il, connection, context, policy, Eh) {
                this.KF = Il;
                this.MG = "The LightstreamerEngine instance is not available";
                this.Cc = null;
                this.Zv = null;
                this.RC = null;
                this.onStatusChange;
                this.onServerError;
                this.onClientError;
                this.onClientAlert;
                this.context = new ls.Context(context);
                this.context.parent = this;
                this.policy = new ls.Policy(policy);
                this.policy.parent = this;
                this.connection = new ls.Connection(connection);
                this.connection.parent = this;
                this.Eh = new ls.cD(Eh);
                this.Eh.parent = this;
                this.BF = ls.kZ.getLogger("EH");
            };
            ls.iC.prototype = {
                kl: function(fC) {
                    if (ls.rG.kh) {
                        return true;
                    } else {
                        this.BF.kE(this.MG, fC);
                        return false;
                    }
                },
                Zq: function(fC) {
                    if (this.kl(fC)) {
                        try {
                            return this.KF[fC]();
                        } catch (Wq) {
                            this.BF.CP(Wq, fC);
                            this.BF.error(this.MG, fC);
                            ls.FD.fx(ls.rG.TjM, 0, ls.rG);
                        }
                    }
                    return null;
                },
                hD: function(sA) {
                    this.RC = sA;
                },
                qe: function(Cc, Zv) {
                    this.Cc = Cc;
                    this.Zv = Zv;
                },
                changeStatus: function(Uf) {
                    if (!(Uf == ls.Qa || Uf == ls.aH || Uf == ls.gU)) {
                        this.BF.kE("Please use one of: POLLING, STREAMING, DISCONNECTED", "changeStatus");
                        return;
                    }
                    if (this.kl("changeStatus")) {
                        this.BF.log("changeStatus", Uf);
                        ls.rG.clQ('VoO', Uf);
                    }
                },
                GG: function() {
                    this.changeStatus(ls.Qa);
                },
                Jv: function() {
                    this.changeStatus(ls.aH);
                },
                Kv: function() {
                    this.changeStatus(ls.gU);
                },
                getStatus: function() {
                    if (this.kl("getStatus")) {
                        return this.RC;
                    } else {
                        return null;
                    }
                },
                getApplicationName: function() {
                    if (this.kl("getApplicationName")) {
                        return ls.AD.CS;
                    } else {
                        return null;
                    }
                },
                getSessionServerName: function() {
                    if (this.kl("getSessionServerName")) {
                        return this.Cc;
                    } else {
                        return null;
                    }
                },
                getSessionServerAddress: function() {
                    if (this.kl("getSessionServerAddress")) {
                        return this.Zv;
                    } else {
                        return null;
                    }
                },
                getPushPages: function() {
                    var MX = this.Zq("getPushPages");
                    if (MX == null) {
                        return [];
                    }
                },
                sendMessage: function(xI, iO, Vg, Sr) {
                    if (this.kl("sendMessage")) {
                        if (Vg) {
                            Vg = ls.fU.tQ(Vg);
                        }
                        if (!ls.rG.DT) {
                            return false;
                        }
                        if (!iO && iO != 0) {
                            iO = "";
                        } else if (!ls.PA.test(iO)) {
                            this.BF.kE("The given sequence name(" + iO + ") is not valid: use only alphanumeric characters plus underscore, or null", "sendMessage");
                            return false;
                        }
                        if ((Sr && isNaN(Sr)) || Sr === "") {
                            this.BF.kE("The given timeout(" + Sr + ") is not valid: use a number or null", "sendMessage");
                            return false;
                        }
                        ls.rG.VcB('SXd', {
                            xI: xI,
                            iO: iO,
                            Vg: Vg,
                            Sr: Sr
                        });
                        return true;
                    }
                    return false;
                },
                qj: function() {
                    if (this.kl('qj')) {
                        ls.rG.NQ('qj');
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.kP = function(rD, nK) {
                this.nK = nK;
                this.rD = rD;
                ls.xL("unload", ls.getClosureForNoParams(this.NW, this));
            };
            ls.kP.prototype = {
                NW: function() {
                    try {
                        this.rD.removeChild(this.nK);
                        delete(this.nK);
                        delete(this.rD);
                    } catch (Wq) {}
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.ao = function() {
                this.nB = null;
                this.pn = null;
                this.Fm = 0;
                this.qt = 0;
                this.BF = ls.kZ.getLogger("EW");
            };
            ls.ao.prototype = {
                QQ: function(SP, AQ, Pq) {
                    if (this.qt != Pq) {
                        this.BF.log('QQ', 0);
                        return;
                    }
                    var IT = false;
                    var GH = null;
                    if (ls.rG.kh) {
                        this.BF.log('QQ', 1);
                        return;
                    }
                    if (!SP) {
                        this.BF.log('QQ', 5);
                        return;
                    }
                    this.Fm++;
                    IT = !this.uk(SP);
                    if (!IT) {
                        if (SP.Lightstreamer.CR) {
                            GH = SP.Lightstreamer.CR;
                        } else {
                            if (SP.hC) {
                                GH = SP.hC;
                            } else {
                                this.BF.log('QQ', 6);
                                IT = true;
                            }
                        }
                    }
                    if (!IT) {
                        if (!GH) {
                            this.BF.log('QQ', 8);
                            IT = true;
                        }
                        if (!GH.KG) {
                            this.BF.log('QQ', 7);
                        } else {
                            if (GH.rk == true) {
                                ls.CR.Oa = false;
                                ls.CR.rk = true;
                                if (ls.CR.KG() == null) {
                                    this.BF.aG("This Push-page can't receive real-time data because the corresponding engine could not start");
                                } else {
                                    this.BF.kw(false, 'QQ');
                                }
                                this.BF.log('QQ', 4);
                                return;
                            }
                            var oN = GH.KG();
                            if (oN == null) {
                                this.BF.log('QQ', 2);
                                IT = true;
                            } else {
                                this.BF.log('QQ', 3);
                                AQ.XG = oN;
                                ls.CR.Al = false;
                            }
                        }
                    }
                    if (IT) {
                        ls.FD.fx(this.QQ, this.Fm <= 30 ? 1000 : 10000, this, [SP, AQ, Pq]);
                    }
                },
                wA: function(SP, AQ) {
                    this.qt++;
                    this.Fm = 0;
                    this.QQ(SP, AQ, this.qt);
                },
                uk: function(SP) {
                    try {
                        if (SP.Lightstreamer) {}
                        this.BF.log('uk', 0);
                        return true;
                    } catch (Wq) {
                        this.BF.CP(Wq, 'uk', document.domain);
                        return false;
                    }
                },
                Ws: function() {
                    if (!document.getElementsByTagName) {
                        return false;
                    }
                    if (this.pn) {
                        this.BF.log('Ws', 7);
                        return false;
                    }
                    var YZ = ls.tj(9, false) ? ls.AD.Dh + ls.fp : "about:blank";
                    this.BF.log('Ws', 6, YZ);
                    var oZ = "LS__" + ls.vb();
                    this.nB = oZ;
                    this.BF.log('Ws', oZ);
                    var qO = document.getElementsByTagName("BODY")[0];
                    if (!qO) {
                        this.BF.error("The createEngine() method should be called in the BODY part of the page, not in the HEAD", "createEngine");
                        return false;
                    }
                    var nK;
                    try {
                        nK = document.createElement("iframe");
                        nK.style.visibility = "hidden";
                        nK.style.height = "0px";
                        nK.style.width = "0px";
                        nK.name = oZ;
                        if (ls.ZK()) {
                            nK.src = ls.AD.AN;
                            qO.appendChild(nK);
                        } else {
                            qO.appendChild(nK);
                            nK.src = ls.AD.AN;
                        }
                        this.pn = new ls.kP(qO, nK);
                    } catch (Wq) {
                        this.BF.CP(Wq, 'Ws', 5);
                        return null;
                    }
                    try {
                        if (nK.contentWindow) {
                            this.BF.log('Ws', 1);
                            try {
                                nK.contentWindow.name = oZ;
                            } catch (cf) {}
                            return nK.contentWindow;
                        } else if (document.frames && document.frames[oZ]) {
                            this.BF.log('Ws', 2);
                            return document.frames[this.nB];
                        } else {
                            this.BF.log('Ws', 3);
                            return self;
                        }
                    } catch (Wq) {
                        this.BF.CP(Wq, 'Ws', 4);
                        return self;
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.PushPage = function() {
                this.context = ls.GQ;
                this.IZ = null;
                this.uB = window;
                this.Mj = 2000;
                this.Dh = null;
                this.PB = null;
                this.or = false;
                this.Hg = 0;
                this.hC = ls.CR;
                this.BU = 0;
                this.rh = ls.JY;
                this.FA = true;
                this.hh = 0;
                this.xb = false;
                this.xe = 0;
                this.bq = false;
                this.rw = null;
                this.sY = 0;
                this.oh = "The application name is missing";
                this.OW = "createEngine() has already been called";
                this.UG = true;
                this.AN = null;
                this.CS = null;
                this.XG = null;
                this.fU = ls.fU;
                this.JS = ls.jD;
                this.da = null;
                this.MJ = null;
                this.nl = true;
                this.jS = null;
                this.BF = ls.kZ.getLogger("PP");
            };
            Lightstreamer.PushPage.prototype = {
                sD: ls.jI,
                setControlRequestTimeout: function(Sr) {
                    this.JS.iZ = this.sD(Sr, "setControlRequestTimeout", this.JS.iZ, true, 10);
                },
                useFragmentToConfEngine: function(Ka) {
                    this.UG = Ka !== false;
                },
                dM: function(Kc) {
                    this.BF.log('dM', Kc);
                    if (!this.fU.BQ[Kc]) {
                        this.BF.error("No such ScreenTableHelper to be deleted: " + Kc, 'dM');
                        return;
                    }
                    delete(this.fU.BQ[Kc]);
                },
                tH: function(applicationName, Ds, Bx, or, Pk) {
                    this.hC.Oa = Bx == "S";
                    this.CS = applicationName;
                    if (Ds.charAt(Ds.length - 1) != "/") {
                        Ds += "/";
                    }
                    this.Dh = Ds;
                    this.PB = Bx;
                    this.or = (or === true);
                    Ds += "lsengine.html";
                    this.BF.log('tH', ls.pW, Bx);
                    if (ls.pW && Bx != "N") {
                        var VS;
                        if ((VS = this.Uo(Bx, applicationName)) != false) {
                            this.BF.log('tH', 1, applicationName, Bx);
                            this.Hg++;
                            ls.FD.fx(this.Dmi, VS.EV, this, [applicationName, Ds, Bx, VS, Pk, this.or]);
                            this.CY(this.CS, null);
                            return false;
                        }
                    }
                    this.BF.log('tH', 0, applicationName, Bx);
                    this.pm(Ds, applicationName, Pk, this.or, Bx);
                    return true;
                },
                Uo: function(tx, applicationName, JF) {
                    var jR = {};
                    jR.EV = 0;
                    var uc = false;
                    var EW = ls.gQ();
                    var bo = ls.QX(ls.EJ + applicationName);
                    if (!bo) {
                        this.BF.log('Uo', 1);
                        return false;
                    }
                    for (var GN = 0; GN < bo.length; GN++) {
                        var LD = ls.QX(ls.EJ + bo[GN] + "_" + applicationName);
                        this.BF.log('Uo', 2, bo[GN], LD);
                        if (!LD || LD.length < 2) {
                            this.MF(bo[GN], applicationName);
                            continue;
                        } else if (tx == "S" && LD[1] != "S") {
                            continue;
                        }
                        if (JF && JF[bo[GN]]) {
                            if (LD[0] != JF[bo[GN]]) {
                                this.BF.log('Uo', 3, LD[0], JF[bo[GN]]);
                                return true;
                            }
                            this.BF.log('Uo', 4);
                            continue;
                        }
                        var ri = Number(LD[0]) + ls.tu + 2000;
                        var rJ = ri - EW;
                        this.BF.log('Uo', 5, bo[GN], rJ);
                        if (rJ <= -60000) {
                            this.MF(bo[GN], applicationName);
                            continue;
                        }
                        if (rJ < this.Mj) {
                            rJ = this.Mj;
                        }
                        jR[bo[GN]] = LD[0];
                        uc = true;
                        jR.EV = jR.EV > rJ ? jR.EV : rJ;
                    }
                    if (uc) {
                        this.BF.log('Uo', 6, jR);
                        return jR;
                    } else {
                        this.BF.log('Uo', 7);
                        return false;
                    }
                },
                MF: function(id, oQ) {
                    ls.fK(ls.EJ + id + "_" + oQ);
                    ls.Fb(ls.EJ + oQ, id);
                },
                La: function() {
                    if (this.xb) {
                        this.MF(this.da, this.CS);
                    }
                },
                de: function(hJ) {
                    var CK = ls.aV(ls.EJ + this.CS, this.da);
                    if (hJ && !CK) {
                        return false;
                    }
                    var Rj = ls.QX(ls.EJ + this.da + "_" + this.CS);
                    if (hJ && Rj) {
                        return false;
                    } else if (Rj && Rj.length > 2) {
                        this.BF.log('de', 1, Rj);
                        this.Ei();
                    } else {
                        ls.xK(ls.EJ + this.da + "_" + this.CS, [ls.gQ(), this.PB]);
                    }
                    return true;
                },
                CD: function() {
                    this.MJ = ls.FD.lD(this.de, ls.tu, this);
                },
                Ei: function() {
                    if (this.MJ) {
                        ls.FD.vL(this.MJ);
                        delete(this.MJ);
                    }
                },
                pm: function(ho, CS, Pk, or, Bx) {
                    var dV = ls.rG;
                    if (dV.kh) {
                        return;
                    } else if (dV.qm) {
                        this.BF.log('pm', 2);
                        ls.FD.fx(this.pm, dV.of, this, [ho, CS, Pk, or, Bx]);
                        return;
                    }
                    this.AA();
                    this.da = ls.vb();
                    this.hC.rk = false;
                    if (ls.pW) {
                        while (!this.de(true)) {
                            this.da = ls.vb();
                        }
                        this.CD();
                    }
                    var ZH = this.UG ? "#" : "?";
                    ZH += "build=1446&";
                    ZH += "id=" + this.da + "&";
                    if (ls.YX != null && ls.YX != "") {
                        ZH += ("domain=" + ls.YX + "&");
                    }
                    if (CS) {
                        ZH += ("engineName=" + CS + "&");
                    }
                    if (or) {
                        ZH += "suppressDefaultStatusChangeHandler=true&";
                    }
                    if (Pk && this.IZ) {
                        if (!this.IZ.context.Fq) {
                            ZH += ("debugAlerts=false&");
                        }
                        if (!this.IZ.context.VY) {
                            ZH += ("remoteDebug=false&");
                        }
                    } else {
                        if (!this.context.Fq) {
                            ZH += ("debugAlerts=false&");
                        }
                        if (!this.context.VY) {
                            ZH += ("remoteDebug=false&");
                        }
                    }
                    if (ls.ObjectTree) {
                        ZH += ("d=true&");
                    }
                    this.AN = ho + ZH;
                    this.XG = self;
                    this.xb = true;
                    this.xe = 0;
                    this.hh++;
                    dV.Kj(true);
                    this.BF.log('pm', 1, this.hh);
                    this.aR(this.hh);
                },
                LvQ: function(Cl) {
                    if (Cl > 2500) {
                        Cl = 2500;
                    } else if (Cl < 50) {
                        Cl = 50;
                    }
                    this.jS = this.jS && this.jS < Cl ? this.jS : Cl;
                    return this.jS;
                },
                enableFasterSeekEngine: function(enabled) {
                    this.nl = !enabled;
                },
                CO: function(Sr) {
                    var inc = 100;
                    var cP = ls.gQ();
                    if (Sr && this.rw) {
                        inc += cP - this.rw - Sr;
                    }
                    this.rw = cP;
                    Sr = this.LvQ(Sr ? Sr + inc : 100);
                    this.jS = null;
                    this.BF.log('CO', 1, inc, Sr);
                    var uQ = this.hh;
                    this.sY++;
                    ls.FD.fx(this.aR, Sr, this, [uQ, Sr]);
                },
                aR: function(uQ, Sr) {
                    if (Sr) {
                        this.sY--;
                    }
                    if (uQ != this.hh || ls.rG.kh) {
                        this.BF.QA('aR', 5);
                        return;
                    }
                    this.Tc();
                    if (this.XG == self) {
                        this.BF.log('aR', 1);
                        this.CO(Sr);
                        return;
                    }
                    var QO = this.hC.KA();
                    if (!QO) {
                        this.BF.log('aR', 3);
                        this.CO(Sr);
                        return;
                    }
                    this.BF.log('aR', 4);
                    this.hh++;
                    ls.rG.Jaa(QO, this.xb);
                },
                Tc: function() {
                    if (this.FA) {
                        this.FA = false;
                        this.hC.pg();
                        this.BF.log('Tc', 11);
                    }
                    if (this.XG != self || this.hC.rk) {
                        this.BF.kw((this.XG != self || this.hC.rk != true), 'Tc');
                        this.BF.log('Tc', 1);
                        return;
                    }
                    if (!this.rh.pn) {
                        if (!ls.XO.Xc() || !ls.ZK()) {
                            var Hh = this.rh.Ws();
                            if (!Hh) {
                                this.BF.log('Tc', 3);
                                return;
                            } else if (Hh != self) {
                                this.XG = Hh;
                                this.bq = true;
                                this.BF.log('Tc', 4);
                                return;
                            }
                        }
                    }
                    if (this.XG == self && this.rh.pn) {
                        if (ls.xW()) {
                            try {
                                if (window.frames[this.rh.nB]) {
                                    this.XG = window.frames[this.rh.nB];
                                    var FV = "" + this.XG.location;
                                    this.BF.log('Tc', 8, FV, this.AN);
                                    if (FV.indexOf("lsengine.html") < 0) {
                                        this.XG.location = this.AN;
                                    }
                                } else {
                                    this.BF.log('Tc', 9);
                                }
                                return;
                            } catch (Wq) {
                                this.BF.CP(Wq, 'Tc', 10);
                                this.XG = self;
                            }
                        } else if (!ls.ZK()) {
                            this.XG = ls.TB(this.AN, this.rh.nB, true);
                            this.BF.log('Tc', 5);
                            if (this.XG === false) {
                                this.XG = self;
                            } else if (this.XG == null && this.xe <= 10) {
                                this.xe++;
                                this.XG = self;
                                this.BF.log('Tc', 6);
                                return;
                            }
                        }
                    }
                    this.BF.log('Tc', 7);
                },
                CY: function(applicationName, SP) {
                    var dV = ls.rG;
                    if (dV.kh) {
                        return;
                    } else if (dV.qm) {
                        this.BF.log("seekEngine", 1);
                        ls.FD.fx(this.CY, dV.of, this, [applicationName, SP]);
                        return;
                    }
                    this.AA();
                    this.hh++;
                    this.BF.log("seekEngine", applicationName, this.hh);
                    this.hC.rk = false;
                    this.hC.Oa = true;
                    this.hC.XT = false;
                    this.CS = applicationName;
                    dV.Kj(true);
                    this.rh.wA(SP, this);
                    this.aR(this.hh);
                },
                Dmi: function(applicationName, Ds, Bx, dH, Pk, or) {
                    this.Hg--;
                    if (this.PB == "N") {
                        this.BF.log('Dmi', 1);
                        return;
                    }
                    if (this.Uo(Bx, applicationName, dH)) {
                        if (Bx == "S") {
                            this.CY(applicationName, null);
                        } else {
                            this.BF.error("An application with this engine name(" + applicationName + ") already exists within this browser.\nThis Push-page can't receive real-time data because the corresponding engine could not start", "createEngine");
                            if (this.onEngineCreation) {
                                try {
                                    this.onEngineCreation(null);
                                } catch (Wq) {
                                    this.BF.Ek(Wq, this.onEngineCreation, "onEngineCreation");
                                }
                            }
                            this.hC.rk = true;
                        }
                    } else if (this.xb && !Pk) {
                        this.BF.error(this.OW, "createEngine");
                    } else {
                        this.pm(Ds, applicationName, Pk, or, Bx);
                    }
                },
                Psl: function(rB) {
                    if (rB) {
                        this.Mj = 10000;
                    } else {
                        this.Mj = 2000;
                    }
                    this.IZ.context.kZ = null;
                    this.AA();
                },
                AA: function() {
                    this.bq = false;
                    this.xb = false;
                    this.XG = null;
                    var WK = this.rh.pn;
                    if (WK) {
                        this.rh.pn = null;
                        ls.FD.fx(WK.NW, 60000, WK);
                    }
                    this.Ei();
                },
                foi: function() {
                    return this.Dh && !this.xb && this.PB == "S";
                },
                OOs: function() {
                    if (this.foi()) {
                        this.tH(this.CS, this.Dh, "N", this.or, false);
                    }
                },
                Ih: function(Zr) {
                    if (this.onClientError) {
                        try {
                            this.onClientError(Zr);
                        } catch (Wq) {
                            this.BF.CP(Wq, 'Ih');
                        }
                    }
                }
            };
            Lightstreamer.PushPage.prototype.isMasterPushPage = function() {
                return ls.rG.Gh;
            };
            Lightstreamer.PushPage.prototype.onEngineLost = function() {
                return;
            };
            Lightstreamer.PushPage.prototype.setCheckEngineTimeout = function(Iv) {
                this.hC.Iv = this.sD(Iv, "setCheckEngineTimeout", Iv, true, 10);
            };
            Lightstreamer.PushPage.prototype.getTable = function(id) {
                var Cs = this.JS.gba(id);
                if (Cs && Cs.hv !== ls.pY) {
                    return Cs;
                }
                return null;
            };
            Lightstreamer.PushPage.prototype.getTables = function() {
                var Xk = {};
                for (var Rx in this.JS.uv) {
                    var Ep = this.JS.gba(Rx);
                    if (Ep && Ep.hv !== ls.pY) {
                        Xk[Rx] = Ep;
                    }
                }
                return Xk;
            };
            Lightstreamer.PushPage.prototype.onServerDeny = function(code, message, Yn, hd, WY, vp) {
                alert("Subscription Error.\n" + message + "(code " + code + ").");
            };
            Lightstreamer.PushPage.prototype.onClientError = function(HQ) {
                return;
            };
            Lightstreamer.PushPage.prototype.onClientAlert = function(code, HQ) {
                ls.FD.fx(alert, 0, null, ["Warning " + code + "\n" + HQ]);
            };
            Lightstreamer.PushPage.prototype.createEngine = function(applicationName, Ds, Bx, or) {
                if (this.qk) {
                    this.BF.kE(this.OW, "createEngine");
                    return;
                }
                if (!applicationName) {
                    this.BF.kE(this.oh, "createEngine");
                } else if (!ls.aA.test(applicationName)) {
                    this.BF.kE("The given engine name(" + applicationName + ") is not valid: use only alphanumeric characters", "createEngine");
                } else if (!Ds) {
                    this.BF.kE("Cannot load the Engine without a path", "createEngine");
                } else if (ls.AD == null) {
                    this.BF.kE("Can't create the Engine if PushPage is not bound. Please call the bind() method of PushPage before", "createEngine");
                } else if (ls.AD != this) {
                    this.BF.kE("There should be only one instance of PushPage per each HTML page. Can't create the Engine if a different PushPage is bound. Please call the createEngine() of that PushPage", "createEngine");
                } else if (Bx != "SHARE_SESSION" && Bx != "FAIL" && Bx != "NEW_SESSION") {
                    if (typeof Bx != "undefined") {
                        this.BF.kE("onSimilarEngineFound must be one of: SHARE_SESSION, FAIL, NEW_SESSION.", "createEngine");
                    }
                    Bx = "NEW_SESSION";
                }
                Bx = Bx.substr(0, 1);
                this.qk = true;
                this.tH(applicationName, Ds, Bx, or, false);
            };
            Lightstreamer.PushPage.prototype.seekEngine = function(applicationName, SP) {
                if (this.qk) {
                    this.BF.kE(this.OW, "seekEngine");
                    return;
                }
                if (!applicationName) {
                    this.BF.kE(this.oh, "seekEngine");
                } else if (!ls.aA.test(applicationName)) {
                    this.BF.kE("The given engine name(" + applicationName + ") is not valid: use only alphanumeric characters", "createEngine");
                }
                this.qk = true;
                this.CY(applicationName, SP);
            };
            Lightstreamer.PushPage.prototype.bind = function() {
                this.BF.QA("bind");
                ls.Ui({
                    jFO: "28442324223623531823424",
                    sMn: "52312352492633183053182",
                    extraN1: "58412404420380382389392"
                });
                ls.lN = ls.Ta("" + ls.jFO + ls.sMn + ls.extraN1, "document", 51, 6, 500);
                ls.Ui({
                    extraV1: "93449415449423434431426",
                    extraV2: "40141541541141541443278"
                });
                ls.Sv = ls.Ta("" + ls.jFO + ls.sMn + ls.extraN1 + ls.extraV1 + ls.extraV2, "document", 74, 5, 500);
                if (ls.AD == this) {
                    this.BF.error("This object is already bound", "bind");
                    return false;
                }
                if (this.context.bind()) {
                    ls.AD = this;
                    ls.kZ.Pe(this.Ih, this);
                    if (window.console && window.console.firebug) {
                        ls.kZ.Qk(this, 130, "Firebug is known to cause performance and memory issues with Lightstreamer.");
                    }
                    if (ls.FlashBridge) {
                        for (var GN in ls.FlashBridge.bridges) {
                            ls.FlashBridge.bridges[GN].fk();
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            };
            Lightstreamer.PushPage.prototype.getWindowReference = function() {
                return this.uB;
            };
            Lightstreamer.PushPage.prototype.cellOverwrite = function(dC, item, field, bL, Jf, Gq, JR, CL) {
                ls.cellOverwrite(dC, item, field, bL, Jf, Gq, JR, CL);
            };
            Lightstreamer.PushPage.prototype.cellScroll = function(dC, row, field, bL, Jf, Gq, JR, CL) {
                ls.cellScroll(dC, row, field, bL, Jf, Gq, JR, CL);
            };
            Lightstreamer.PushPage.prototype.cellMetapush = function(dC, row, field, bL, Jf, Gq, JR, CL) {
                ls.cellMetapush(dC, row, field, bL, Jf, Gq, JR, CL);
            };
            Lightstreamer.PushPage.prototype.addTable = function(YM, id) {
                if (!YM || (!id && id !== 0)) {
                    this.BF.kE("Table Object And/Or Table id is null", "addTable");
                }
                if (YM.Zu != "COMMAND" && YM.Zu != "MERGE" && YM.Zu != "DISTINCT" && YM.Zu != "RAW") {
                    this.BF.kE(YM.Zu + " is not a valid subscription mode. Admitted values are MERGE, DISTINCT, RAW, COMMAND", "addTable");
                }
                if (ls.AD == null) {
                    this.BF.kE("Can't add a table if PushPage is not bound. Please call the bind() method of PushPage before adding tables", "addTable");
                }
                return this.JS.SkS(YM, id);
            };
            Lightstreamer.PushPage.prototype.addScreenTableHelper = function(DU) {
                this.BF.log("addScreenTableHelper", DU);
                if (this.fU.BQ[DU.dC]) {
                    this.BF.error("ScreenTableHelper already set for " + DU.dC + ", add new cells to the previously provided ScreenTableHelper", "addScreenTableHelper");
                    return;
                }
                this.fU.BQ[DU.dC] = DU;
            };
            Lightstreamer.PushPage.prototype.removeTable = function(id) {
                this.BF.log("removeTable", 1, id);
                var sJ = this.JS.gba(id);
                if (!sJ) {
                    this.BF.error("No table to delete with id " + id, "removeTable");
                    return null;
                }
                return this.JS.XfF(id);
            };
            Lightstreamer.PushPage.prototype.onEngineCreation = function(engine) {
                return;
            };
            Lightstreamer.PushPage.prototype.onEngineReady = function(engine) {
                return;
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Pd = function(rG) {
                this.uv = {};
                this.cF = {};
                this.BU = 1;
                this.dV = rG;
                this.iZ = 2000;
                this.BF = ls.kZ.getLogger("TL");
            };
            ls.Pd.prototype = {
                fXg: function(JL) {
                    return this.gba(this.cF[JL]);
                },
                gba: function(Rx) {
                    if (Rx && this.uv[Rx]) {
                        return this.uv[Rx];
                    }
                    return null;
                },
                SkS: function(Wd, Rx) {
                    if (Wd.qb != ls.egq) {
                        this.BF.error("Can't add a table that is already in 'running' state. Please add the table instance only once [" + Rx + "]", "addTable");
                        return null;
                    }
                    this.BF.log('SkS', 0, Wd, Rx);
                    var Tn = this.uv[Rx];
                    if (Tn) {
                        Tn = this.XfF(Rx);
                    }
                    if (!Wd.uoh(Rx, ++this.BU)) {
                        this.BF.log('SkS', 1);
                        Wd.xFg();
                        return Tn;
                    }
                    this.uv[Rx] = Wd;
                    Wd.ljW();
                    if (this.dV.DT) {
                        this.Da(Wd);
                    }
                    this.BF.log('SkS', 2);
                    return Tn;
                },
                XfF: function(Rx) {
                    var lt = this.uv[Rx];
                    if (!lt) {
                        this.BF.Ct('XfF', Rx, 1);
                        return null;
                    }
                    if (lt.qb == ls.egq) {
                        this.BF.Ct('XfF', Rx, 2);
                        return null;
                    } else if (lt.qb == ls.YQM || lt.qb == ls.aRs) {
                        this.BF.kw(this.dV.kh, 'XfF', 4, Rx);
                        this.BF.log('XfF', 2, Rx, lt);
                        if (lt.RD) {
                            this.dV.nKN('ar', {
                                JL: lt.RD
                            });
                        } else {
                            this.dV.nKN('ar', {
                                dC: Rx,
                                TD: this.dV.Ne
                            });
                        }
                    }
                    if (lt.RD) {
                        delete(this.cF[lt.RD]);
                    }
                    lt.xFg();
                    delete(this.uv[Rx]);
                    return lt;
                },
                Da: function(Wd, YE, sH) {
                    if (YE) {
                        if (Wd.qb != ls.vlN) {
                            this.BF.log('Da', 1);
                            return;
                        }
                        if (YE != this.dV.ZP) {
                            this.BF.log('Da', 2);
                            return;
                        }
                        if (sH != Wd.tq) {
                            this.BF.log('Da', 3);
                            return;
                        }
                    } else {
                        if (Wd.qb != ls.Xnh) {
                            this.BF.kw(false, 'Da');
                        }
                        Wd.HnX();
                    }
                    this.BF.log('Da', 4);
                    ls.FD.fx(this.Da, this.iZ, this, [Wd, this.dV.ZP, Wd.tq]);
                    this.dV.nKN('PVS', {
                        uO: Wd.uO,
                        dC: Wd.Rx,
                        tq: Wd.tq,
                        TD: this.dV.Ne,
                        SM: Wd.SM,
                        Ob: Wd.DA
                    });
                },
                lDj: function(dC, JL, uO, tq) {
                    var wi = this.uv[dC];
                    if (!wi || wi.qb != ls.vlN || wi.uO != uO || wi.tq != tq) {
                        this.BF.log('lDj', 1, uO, tq, wi);
                        return;
                    }
                    wi.lDj(JL);
                    this.cF[JL] = dC;
                    this.kx(wi);
                },
                kx: function(Wd, YE, km, uO, tq, vN) {
                    if (Wd.qb != ls.YQM) {
                        this.BF.log('kx', 1);
                        return;
                    }
                    if (YE) {
                        if (YE != this.dV.ZP || Wd.uO != uO || Wd.tq != tq) {
                            this.BF.log('kx', 1, YE, this.dV);
                            return false;
                        }
                        vN++;
                    } else {
                        vN = 1;
                    }
                    var KK = km ? km * 2 : this.iZ;
                    this.BF.log('kx', 3, KK, Wd);
                    Wd.hX = ls.FD.mp(this.kx, this, [Wd, this.dV.ZP, KK, Wd.uO, Wd.tq, vN]);
                    Wd.fr = KK;
                    var Pp = this.dV.nKN('UiD', {
                        TD: this.dV.Ne,
                        JL: Wd.RD,
                        Ea: vN
                    });
                },
                Axj: function() {
                    this.BF.log('Axj');
                    for (var Rx in this.uv) {
                        this.Da(this.uv[Rx]);
                    }
                },
                fY: function(Cs) {
                    if (Cs.qb == ls.egq || Cs.hv === ls.pY) {
                        this.BF.log('fY', 1, Cs);
                        this.BF.kw(Cs.qb != ls.egq, 'fY');
                        return;
                    }
                    this.BF.log('fY', 2, Cs);
                    delete(this.cF[Cs.RD]);
                    Cs.Fja();
                },
                Sfx: function() {
                    this.BF.log('Sfx', 1);
                    for (var Rx in this.uv) {
                        this.fY(this.uv[Rx]);
                    }
                    this.cF = {};
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.ScreenTableHelper = function(id, Ug) {
                this.dC = id;
                this.BF = ls.kZ.getLogger("TL");
                this.cm = false;
                this.Ug = [];
                if (Ug) {
                    for (var GN = 0; GN < Ug.length; GN++) {
                        this.addCell(Ug[GN]);
                    }
                }
                this.rF = DR;
                this.dF = document;
            };
            Lightstreamer.ScreenTableHelper.prototype = {
                addCell: function(nQ) {
                    var Cs = nQ.getAttribute("table");
                    if (!Cs || Cs != this.dC) {
                        this.BF.kE("The cell does not belong to the '" + this.dC + "' screen table", "addCell");
                        return;
                    }
                    this.cm = true;
                    this.Ug[this.Ug.length] = new ls.qu(nQ);
                },
                setNodeTypes: function(HG) {
                    if (HG && HG.length > 0) {
                        this.rF = HG;
                    } else {
                        this.BF.kE("The given array is not valid or empty", "setNodeTypes");
                    }
                },
                setRootNode: function(TL) {
                    if (TL && TL.getElementsByTagName) {
                        this.dF = TL;
                    } else {
                        this.BF.kE("The given root element is not valid", "setRootNode");
                    }
                }
            };
            var DR = ["div", "span", "input"];
            ls.ScreenTableHelper.DR = DR;
        })(Lightstreamer);
        (function(ls) {
            ls.Vb = function(Rx) {
                this.Rx = Rx;
                this.hv = null;
                this.NT = null;
                this.Qo = 0;
                this.nP = new ls.BL();
                this.pJ = new ls.BL();
                this.ge = new ls.BL();
                this.EA = new ls.BL();
                this.tW = new ls.BL();
                this.vj = new ls.BL();
                this.Ia = new ls.BL();
                this.mJ = 0;
                this.sZ = new ls.BL();
                this.sb = new ls.BL();
                this.eN = new ls.BL();
                this.tN = new ls.BL();
                this.IP = {};
                this.Bp = {};
                this.Km = 1;
                this.XC = [];
                this.kL = {};
                this.pK = {};
                this.Ag;
                this.pc;
                this.LH;
                this.eu;
                this.Vn;
                this.vm;
                this.bE;
                this.KT;
                this.TH = 0;
                this.BF = ls.kZ.getLogger("ST");
            };
            ls.Vb.prototype = {
                DqD: function(nn) {
                    if (this.hv != null) {
                        if (this.hv != nn.hv) {
                            this.BF.error("A Data Table cannot be associated with a Screen Table that was previously associated with a Data Table of a different type", "addTable");
                            return false;
                        }
                    }
                    this.NT = nn;
                    this.Mn = nn.Mn;
                    if (this.hv == null) {
                        this.hv = nn.hv;
                    }
                    return true;
                },
                lSC: function(BD, Dk, oG, Eo) {
                    if ((Eo.indexOf(ls.Nr) > -1) || (Eo.indexOf(ls.LW) > -1)) {
                        if (this.mJ < Dk) {
                            this.mJ = Dk;
                        }
                    }
                    this.Qo++;
                    this.insertCell(BD, Dk, oG);
                },
                insertCell: function(BD, Dk, oG) {
                    this.nP.fS(BD, Dk, oG);
                },
                Auv: function(Dk, oG) {
                    return this.nP.Fe(Dk, oG);
                },
                deleteCell: function(Dk, oG) {
                    this.nP.rA(Dk, oG);
                },
                lih: function(Dk, cR) {
                    dZ = this.vj.Fe(Dk, cR);
                    if (!dZ) {
                        dZ = ls.vX;
                    }
                    ls.fU.mx(this.Rx, Dk, cR, dZ, ls.PT, this.tW.US(Dk), true);
                },
                iHv: function(Dk) {
                    return this.nP.US(Dk);
                },
                tke: function() {
                    return this.nP.Yd();
                },
                Co: function(Dk, MA) {
                    if (MA) {
                        this.nP.Lb(Dk);
                    }
                    this.eN.Lb(Dk);
                    this.tN.Lb(Dk);
                    this.sZ.Lb(Dk);
                    this.pJ.Lb(Dk);
                    this.ge.Lb(Dk);
                    this.tW.Lb(Dk);
                    this.EA.Lb(Dk);
                    this.sb.Lb(Dk);
                    delete(this.kL[Dk]);
                    delete(this.pK[Dk]);
                    var uu = this.Bp[Dk];
                    if (uu) {
                        delete this.IP[uu];
                        delete this.Bp[Dk];
                    }
                },
                nMx: function(Qx) {
                    if (Qx == 0) {
                        return;
                    }
                    var ws = this.TH - this.Km + 1;
                    if (ws <= Qx) {
                        return;
                    }
                    var YS = ws - Qx;
                    for (var GN = 1; GN <= YS; GN++) {
                        this.KV();
                    }
                },
                KV: function() {
                    this.BF.kw(this.NT, 'KV');
                    var ws = this.TH - this.Km + 1;
                    if (ws <= 0) {
                        return 0;
                    }
                    var jG = this.XC.shift();
                    if (this.NT && this.NT.onChangingValues) {
                        try {
                            this.NT.onChangingValues(jG, null);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.NT.onChangingValues, "onChangingValues");
                        }
                    }
                    if (jG && ls.qu.gL(jG)) {
                        jG.parentNode.removeChild(jG);
                    }
                    this.Co(this.Km, true);
                    this.Km++;
                    return ws - 1;
                },
                wMx: function(uu, ir, rb) {
                    var Cs = this.NT;
                    var le = Cs.ej.US(uu);
                    for (var cR in le) {
                        var WH = Cs.JH[cR];
                        if (WH == null) {
                            continue;
                        }
                        this.tN.fS(Cs.qM.Fe(uu, cR), ir, WH);
                        if (le[cR] !== null) {
                            this.eN.fS(le[cR], ir, WH);
                        } else if (!rb) {} else {
                            this.eN.fS(null, ir, WH);
                        }
                    }
                },
                pbo: function(gG, hV, Bq, lO) {
                    if (gG == hV) {
                        return;
                    }
                    var oe;
                    if (lO) {
                        oe = this.lW(gG, null);
                    }
                    var GN = gG;
                    do {
                        var ZD = GN;
                        GN += Bq;
                        var QI = GN;
                        this.lW(QI, ZD);
                    } while (GN != hV);
                    if (lO) {
                        this.BF.kw(this.hv == ls.LW, 'pbo', 1);
                        this.lW(null, hV, oe);
                    }
                },
                lW: function(QI, ZD, Ye) {
                    var Wn = {};
                    Wn.dX = {};
                    var IO;
                    if (QI) {
                        IO = this.eN.US(QI);
                    } else {
                        IO = Ye.eN;
                    }
                    for (var Ex in IO) {
                        if (Ye && Ye.dX[Ex]) {
                            Wn.dX[Ex] = this.oRc(QI, ZD, Ex, Ye.dX[Ex]);
                        } else {
                            Wn.dX[Ex] = this.oRc(QI, ZD, Ex);
                        }
                    }
                    var iU;
                    var UP;
                    var YO;
                    var dJ;
                    var kW;
                    var Ec;
                    var OX;
                    var mP;
                    if (QI) {
                        iU = this.EA.Nn(QI);
                        UP = this.tW.Nn(QI);
                        dJ = this.pJ.Nn(QI);
                        YO = this.ge.Nn(QI);
                        Ec = this.eN.Nn(QI);
                        OX = this.tN.Nn(QI);
                        mP = this.sZ.Nn(QI);
                        sN = this.sb.Nn(QI);
                        if (this.NT.Cn) {
                            kW = this.NT.Cn[QI];
                        }
                    } else {
                        iU = Ye.EA;
                        UP = Ye.tW;
                        dJ = Ye.pJ;
                        YO = Ye.ge;
                        Ec = Ye.eN;
                        OX = Ye.tN;
                        mP = Ye.sZ;
                        sN = Ye.sb;
                        if (this.NT.Cn) {
                            kW = Ye.Cn;
                        }
                    }
                    if (ZD) {
                        this.EA.insertRow(iU, ZD);
                        this.tW.insertRow(UP, ZD);
                        this.pJ.insertRow(dJ, ZD);
                        this.ge.insertRow(YO, ZD);
                        this.eN.insertRow(Ec, ZD);
                        this.tN.insertRow(OX, ZD);
                        this.sZ.insertRow(mP, ZD);
                        this.sb.insertRow(sN, ZD);
                        if (this.NT.Cn) {
                            this.NT.Cn[ZD] = kW;
                        }
                    } else {
                        Wn.EA = iU;
                        Wn.tW = UP;
                        Wn.pJ = dJ;
                        Wn.ge = YO;
                        Wn.eN = Ec;
                        Wn.tN = OX;
                        Wn.sZ = mP;
                        Wn.sb = sN;
                        if (this.NT.Cn) {
                            Wn.Cn = kW;
                        }
                    }
                    if (QI && ZD && this.NT) {
                        var bd = ls.Xv;
                        bd.Kj(this.NT, this.Bp[ZD], ZD);
                        if (this.NT.onRowUpdate) {
                            try {
                                this.NT.onRowUpdate(ZD, bd);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.NT.onRowUpdate, "onRowUpdate");
                            }
                        }
                    }
                    return Wn;
                },
                oRc: function(QI, ZD, Ex, ow) {
                    var LF;
                    if (QI) {
                        LF = this.Auv(QI, Ex);
                    } else {
                        LF = ow;
                    }
                    var Ab;
                    if (ZD) {
                        Ab = this.Auv(ZD, Ex);
                    }
                    if (!Ab) {
                        var RP = document.createElement("div");
                        Ab = new ls.qu(RP);
                    }
                    if (ZD) {
                        this.insertCell(Ab, ZD, Ex);
                    }
                    var bf;
                    var hn;
                    var Wt = false;
                    if (QI) {
                        bf = this.sZ.Fe(QI, Ex);
                        var Ud = this.sb.US(QI);
                        if (!bf) {
                            bf = Ud;
                        } else
                            for (var Qc in Ud) {
                                if (!bf[Qc]) {
                                    bf[Qc] = 1;
                                }
                            }
                        hn = this.eN.Fe(QI, Ex);
                        if (hn === null) {
                            if (ZD) {
                                hn = this.vj.Fe(ZD, Ex);
                            } else {}
                            Wt = true;
                        }
                    } else {
                        bf = LF.Rq;
                        if (LF.wX) {
                            hn = null;
                        } else {
                            hn = LF.Rl();
                        }
                    }
                    Ab.Qh = LF.Qh;
                    Ab.oD = LF.oD;
                    Ab.FW = LF.FW;
                    Ab.sq = LF.sq;
                    Ab.HM = LF.HM;
                    Ab.jZ.className = LF.jZ.className;
                    for (var Qc in bf) {
                        Ab.jZ.style[Qc] = LF.jZ.style[Qc];
                    }
                    if (ZD) {
                        var Jn = this.sZ.Fe(ZD, Ex);
                        for (var Qc in Jn) {
                            if (!bf[Qc]) {
                                Ab.jZ.style[Qc] = "";
                            }
                        }
                        if (hn === null) {
                            hn = this.vj.Fe(ZD, Ex);
                        }
                        ls.fU.mx(this.Rx, ZD, Ex, hn, ls.au, null, Wt);
                    } else {
                        var wX = null;
                        Ab.wX = (hn == null);
                        if (!Ab.wX) {
                            Ab.Tr(hn);
                        }
                        Ab.Rq = bf;
                    }
                    return Ab;
                },
                Lm: function() {
                    if (this.NT && this.NT.qK && this.NT.qK.appendChild) {
                        delete(this.NT.qK);
                    }
                    var vS = this.tke();
                    for (var GN in vS) {
                        for (var Ar in vS[GN]) {
                            vS[GN][Ar].Lm();
                        }
                    }
                    if (this.eu) {
                        delete(this.eu);
                    }
                    if (this.vm) {
                        delete(this.vm);
                    }
                    if (this.Vn) {
                        delete(this.Vn);
                    }
                    if (this.im) {
                        delete(this.im);
                    }
                    if (this.KT) {
                        delete(this.KT);
                    }
                    if (this.bE) {
                        if (this.bE.Lm) {
                            this.bE.Lm();
                        } else {
                            delete(this.bE);
                        }
                    }
                    if (this.pc) {
                        this.pc.Lm();
                    }
                    if (this.Ag) {
                        this.Ag.Lm();
                    }
                    for (var GN in this.kL) {
                        if (this.kL[GN] && this.kL[GN].Lm) {
                            this.kL[GN].Lm();
                        }
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.ID = function(Rx) {
                this.uW(ls.ID, Rx);
                this.hv = ls.oW;
            };
            ls.ID.prototype = {
                DqD: function(nn) {
                    if (nn.hv != ls.oW) {
                        this.BF.error("A Data Table cannot be associated with a Screen Table that was previously associated with a Data Table of a different type", "addTable");
                        return false;
                    }
                    this.NT = nn;
                    return true;
                }
            };
            ls.Ou(ls.ID, ls.Vb);
        })(Lightstreamer);
        Lightstreamer.Ui({
            egq: 1,
            vlN: 2,
            YQM: 3,
            aRs: 4,
            Xnh: 5
        });
        (function(ls) {
            Lightstreamer.Table = function(mt, oB, Pm) {
                this.eY = mt ? ls.GroupDescriptor.tO(mt) : null;
                this.ac = oB ? ls.SchemaDescriptor.Sh(oB) : null;
                this.Zu = new String(Pm).toUpperCase();
                this.rt = false;
                this.hU = null;
                this.rn = null;
                this.gG = null;
                this.hV = null;
                this.tC = null;
                this.MN = null;
                this.RD = null;
                this.qM = new ls.BL();
                this.Fw = new ls.BL();
                this.ej = new ls.BL();
                this.aP = null;
                this.Ya = new ls.BL();
                this.qb = ls.egq;
                this.Rx = null;
                this.DA = "";
                this.tq = 0;
                this.uO = null;
                this.HM = 0;
                this.Oh = 3000;
                this.SM = 0;
                this.hX;
                this.fr;
                this.hv = null;
                var LC = " See the documentation for further details";
                this.fg = "This method must be called at runtime." + LC;
                this.HR = "This method cannot be called at runtime." + LC;
                this.BF = ls.kZ.getLogger("TL");
                this.CV = 0;
            };
            Lightstreamer.Table.prototype = {
                sD: ls.jI,
                AY: ls.oI,
                uoh: function(Rx, uO) {
                    this.BF.log('uoh', Rx, uO);
                    this.qb = ls.Xnh;
                    this.uO = uO;
                    this.Rx = Rx;
                    this.tq++;
                    this.CV++;
                    this.BF.kw(this.CV == 1, 'uoh', 1, this.CV, this);
                    return true;
                },
                HnX: function() {
                    this.RD = null;
                    this.tq++;
                    this.hX = null;
                    this.fr = null;
                    this.qb = ls.vlN;
                    this.BF.log('HnX', this);
                },
                lDj: function(JL) {
                    this.BF.log('lDj', JL);
                    this.RD = JL;
                    this.qb = ls.YQM;
                },
                Fja: function() {
                    this.qb = ls.Xnh;
                    this.gb();
                    this.BF.log('Fja', this);
                },
                xFg: function() {
                    this.qb = ls.egq;
                    this.uO = null;
                    this.gb();
                    delete(this.DA);
                    this.CV--;
                    this.BF.kw(this.CV == 0, 'xFg', 1, this.CV, this);
                    this.BF.log('xFg', this);
                },
                gb: function() {
                    this.RD = null;
                    if (this.ac) {
                        this.ac.reset();
                    }
                    this.hX = null;
                    this.fr = null;
                    this.BF.log('gb', this);
                },
                icu: function() {
                    this.qb = ls.aRs;
                    if (this.onStart) {
                        try {
                            this.onStart();
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onStart, "onStart");
                        }
                    }
                },
                Opv: function() {
                    return this.qb != ls.egq;
                },
                bnu: function() {
                    return this.qb == ls.aRs;
                },
                sa: function() {
                    if (!this.eY) {
                        this.BF.kE("Cannot initiate a " + this.getClassName() + " without a group", this.getClassName());
                    }
                },
                Ix: function() {
                    if (!this.ac) {
                        this.BF.kE("Cannot initiate a " + this.getClassName() + " without a schema", this.getClassName());
                    }
                },
                ljW: function() {
                    this.DA = "LS_mode=" + this.Zu + "&" + "LS_id=" + ls.dj(this.eY.Ha()) + "&" + "LS_schema=" + ls.dj(this.ac.xl()) + "&";
                    if (this.MN != null) {
                        this.DA += ("LS_data_adapter=" + ls.dj(this.MN) + "&");
                    }
                    if (this.tC != null) {
                        this.DA += ("LS_selector=" + ls.dj(this.tC) + "&");
                    }
                    if (this.gG != null) {
                        this.DA += ("LS_start=" + this.gG + "&");
                    }
                    if (this.hV != null) {
                        this.DA += ("LS_end=" + this.hV + "&");
                    }
                    if (this.rt != null && this.rt != false) {
                        this.DA += ("LS_snapshot=" + this.rt + "&");
                    }
                    if (this.hU != null) {
                        var En = this.hU;
                        if (En == "unfiltered") {
                            this.DA += ("LS_requested_max_frequency=" + En + "&");
                        } else if (En != "unlimited" && En > 0) {
                            this.DA += ("LS_requested_max_frequency=" + En + "&");
                        }
                    }
                    if (this.hv.indexOf(ls.Do) > -1) {
                        this.Ef = this.hU;
                    }
                    if (this.rn != null) {
                        var mi = this.rn;
                        if (mi != "unlimited" && mi > 0) {
                            this.DA += ("LS_requested_buffer_size=" + mi + "&");
                        }
                    }
                    this.BF.log('ljW', this.DA);
                    return;
                },
                getSchema: function() {
                    return this.ac;
                },
                getGroup: function() {
                    return this.eY;
                },
                setDataAdapter: function(MN) {
                    this.BF.log("setDataAdapter", arguments);
                    this.MN = MN;
                },
                getId: function() {
                    return this.Rx;
                },
                setSelector: function(selector) {
                    this.BF.log("setSelector", arguments);
                    this.tC = selector;
                },
                EGj: function() {
                    return this.tC;
                },
                setItemsRange: function(start, hV) {
                    this.gG = this.sD(start, "setItemsRange", this.gG, true, 1);
                    this.hV = this.sD(hV, "setItemsRange", this.hV, true, this.gG);
                },
                xNB: function() {
                    return [this.gG, this.hV];
                },
                setRequestedMaxFrequency: function(SI) {
                    SI = new String(SI);
                    SI = SI.toLowerCase();
                    if (SI == "unfiltered" || SI == "unlimited") {
                        this.hU = SI;
                    } else {
                        this.hU = this.sD(SI, "setRequestedMaxFrequency", this.hU, false, 0);
                    }
                },
                eQB: function() {
                    return this.hU;
                },
                setRequestedBufferSize: function(size) {
                    size = new String(size);
                    size = size.toLowerCase();
                    if (size == "unlimited") {
                        this.rn = size;
                    } else {
                        this.rn = this.sD(size, "setRequestedBufferSize", this.rn, true, 0);
                    }
                },
                xjD: function() {
                    return this.rn;
                },
                setSnapshotRequired: function(wG) {
                    if (wG === true || wG === false) {
                        this.rt = wG;
                    } else {
                        if (this.Zu == "DISTINCT") {
                            this.rt = this.sD(wG, "setSnapshotRequired", this.rt, true, 0);
                        } else {
                            this.BF.kE("Numeric values are only allowed when the subscription mode is DISTINCT", "setSnapshotRequired");
                            return;
                        }
                    }
                },
                xkB: function() {
                    return this.rt;
                },
                onItemUpdate: function(IM, qB, YF) {
                    return;
                },
                onLostUpdates: function(IM, Om, YF, vp) {
                    return;
                },
                onEndOfSnapshot: function(IM, YF) {
                    return;
                },
                onStart: function() {
                    return;
                },
                getClassName: function() {
                    return null;
                },
                ZBk: function(wF, LN, FE) {
                    if (this.hv == ls.pY) {
                        this.oT.Ts.vG(wF.length - 2);
                        wF = this.USv(wF);
                        if (wF == null) {
                            return true;
                        }
                        return this.oT.ZBk(wF, LN, true);
                    }
                    if (!FE) {
                        this.ac.vG(wF.length - 2);
                    }
                    this.HM++;
                    if (this.HM >= this.Oh) {
                        this.HM = 0;
                        if (this.cp) {
                            this.cp();
                        }
                    }
                    var bM = wF[1];
                    var uu = new String(bM);
                    if (this.hv.indexOf(ls.LW) > -1) {
                        uu = this.hva(wF, bM, FE);
                        if (uu == null) {
                            return uu;
                        }
                    }
                    if (this.hv.indexOf(ls.Do) > -1 && !FE) {
                        this.pv(wF);
                    }
                    this.gf(uu);
                    if (this.onItemUpdate) {
                        ls.qB.Kj(this, uu, wF, LN);
                        var qs = this.eY.wp(bM);
                        try {
                            this.onItemUpdate(bM, ls.qB, qs);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onItemUpdate, "onItemUpdate");
                        }
                    }
                    if (!this.Opv()) {
                        return uu;
                    }
                    this.HZ(uu, wF);
                    return uu;
                },
                gf: function(uu) {
                    var oe = this.Fw.US(uu);
                    for (var Iq in oe) {
                        var Ym = Iq;
                        var ad = false;
                        var IC = Iq.indexOf("|rem");
                        if ((IC > -1) && (IC == Iq.length - 4)) {
                            Ym = Iq.substring(0, Iq.length - 4);
                            if (this.hv.indexOf(ls.Nr) > -1) {
                                this.ej.fS(this.Fw.Fe(uu, Iq), uu, Ym);
                            } else {
                                this.ej.fS(null, uu, Ym);
                            }
                        } else {
                            this.Fw.rA(uu, Iq);
                            this.Ib(null, uu, Iq);
                        }
                    }
                },
                XUE: function(gH) {
                    if (gH == null) {
                        return "";
                    } else if (gH.length === -1) {
                        return null;
                    } else {
                        return gH;
                    }
                },
                Ib: function(Cl, uu, oG) {
                    var gq = this.XUE(Cl);
                    if (gq != null) {
                        this.aP.push(oG);
                    }
                    this.ej.fS(gq, uu, oG);
                },
                HZ: function(uu, wF) {
                    this.aP = [];
                    var hM = wF.length - 2;
                    var oG = 1;
                    var Fp = 2;
                    for (; oG <= hM; oG++, Fp++) {
                        if (wF[Fp] == null) {
                            this.qM.fS(null, uu, oG);
                        } else if (wF[Fp] !== ls.Nu) {
                            this.qM.fS(wF[Fp], uu, oG);
                        }
                        this.Ib(wF[Fp], uu, oG);
                    }
                    var SN = {};
                    var oe = this.Fw.US(uu);
                    for (var oG in oe) {
                        var oG = oG;
                        var IC = oG.indexOf("|rem");
                        if ((IC > -1) && (IC == oG.length - 4)) {
                            oG = oG.substring(0, oG.length - 4);
                        }
                        SN[oG] = true;
                        this.VM(uu, oG, oe);
                    }
                    var Zk = this.ej.US(uu);
                    for (var oG in Zk) {
                        if (oG <= hM) {
                            continue;
                        }
                        if (SN[oG] == true) {
                            continue;
                        }
                        this.VM(uu, oG, oe);
                    }
                },
                VM: function(uu, oG, oe) {
                    var ef;
                    if (!oe) {
                        ef = null;
                    } else {
                        ef = oe[oG];
                        if (typeof ef == "undefined") {
                            ef = oe[oG + "|rem"];
                            if (typeof ef == "undefined") {
                                ef = null;
                            }
                        }
                    }
                    if (this.qM.Fe(uu, oG) == ef) {
                        this.Ib(ls.Nu, uu, oG);
                    } else {
                        this.qM.fS(ef, uu, oG);
                        this.Ib(ef, uu, oG);
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.VisualTable = function(mt, oB, Pm) {
                this.uW(ls.VisualTable, mt, oB, Pm);
                this.dL = this.ac ? false : true;
                this.NT = null;
                this.Mn = false;
                this.sx = true;
                this.XL = false;
                this.WD = false;
                this.SU = null;
                this.JH = null;
                this.hv = null;
                this.Fo = true;
                this.EH = false;
                this.BF.log("VisualTable", arguments);
            };
            Lightstreamer.VisualTable.prototype = {
                uoh: function(Rx, uO) {
                    if (!this.AE(ls.VisualTable, 'uoh', Rx, uO)) {
                        return false;
                    }
                    if (!this.ejx()) {
                        return false;
                    }
                    if (!this.aqD()) {
                        return false;
                    }
                    this.kG();
                    this.EH = false;
                    if (this.sx) {
                        this.bR();
                    }
                    return true;
                },
                kG: function() {},
                aqD: function() {},
                xFg: function() {
                    this.AE(ls.VisualTable, 'xFg');
                    if (this.XL) {
                        this.bR();
                    }
                    if (this.dL) {
                        this.ac = null;
                    } else {
                        this.ac.Fs();
                    }
                    this.NT = null;
                },
                Fja: function() {
                    this.AE(ls.VisualTable, 'Fja');
                    this.EH = true;
                    if (this.WD) {
                        this.bR();
                    }
                },
                bR: function() {
                    if (this.Fo) {}
                    this.Fo = true;
                    this.qM = new ls.BL();
                    this.Fw = new ls.BL();
                    this.ej = new ls.BL();
                    this.Ya = new ls.BL();
                    return true;
                },
                icu: function() {
                    this.AE(ls.VisualTable, 'icu');
                    if (this.EH && this.sx) {
                        this.bR();
                    }
                    this.Fo = false;
                },
                setClearOnRemove: function(clear) {
                    if (clear) {
                        this.XL = true;
                    } else {
                        this.XL = false;
                    }
                },
                bQE: function() {
                    return this.XL;
                },
                setClearOnDisconnected: function(clear) {
                    if (clear) {
                        this.WD = true;
                    } else {
                        this.WD = false;
                    }
                },
                LCP: function() {
                    return this.WD;
                },
                setClearOnAdd: function(clear) {
                    if (clear) {
                        this.sx = true;
                    } else {
                        this.sx = false;
                    }
                },
                STI: function() {
                    return this.sx;
                },
                setPushedHtmlEnabled: function(Wg) {
                    if (this.Opv()) {
                        this.BF.kE(this.HR, "setPushedHtmlEnabled");
                    }
                    this.Mn = this.AY(Wg, "setPushedHtmlEnabled", this.Mn);
                },
                isPushedHtmlEnabled: function() {
                    return this.Mn;
                },
                showValues: function(item, et) {
                    if (!this.Opv()) {
                        this.BF.kE(this.fg, "showValues");
                    }
                    this.aP = [];
                    this.Fo = false;
                    var Dm = this.eY.Fa(item);
                    var uu = Dm;
                    var na = [];
                    var uN = {};
                    for (var ZG in et) {
                        var Ax = this.ac.Kq(ZG);
                        uN[Ax] = this.WWb(et[ZG]);
                        this.aP.push(Ax);
                        if (typeof(Ax) == "number") {
                            Ax += 1;
                        }
                        na[Ax] = et[ZG];
                    }
                    var xY = "For Metapush and DynaMetapush tables, only UPDATE commands are admitted in showValues";
                    if (this.hv.indexOf(ls.LW) > -1) {
                        if (typeof na[this.keyCode + 1] == "undefined") {
                            this.BF.kE("Key position is not set correctly", "showValues");
                        } else if (typeof na[this.jA + 1] == "undefined") {
                            this.BF.kE("Command position is not set correctly", "showValues");
                        } else if (na[this.jA + 1] == "DELETE") {
                            this.BF.kE(xY, "showValues");
                        }
                        uu = Dm + "|" + na[this.keyCode + 1];
                        if (this.hv.indexOf(ls.iw) > -1) {
                            var XH = this.NT.kL[uu];
                            if (!XH) {
                                this.BF.kE(xY, "showValues");
                            }
                        } else {
                            var mB = this.NT.IP[uu];
                            if (!mB) {
                                this.BF.kE(xY, "showValues");
                            }
                        }
                    }
                    this.ej.insertRow(uN, uu);
                    this.Ya.Lb(uu);
                    this.RF(uu, na, true);
                },
                WWb: function(gH) {
                    if (typeof gH == "undefined") {
                        return null;
                    }
                    if (gH == null) {
                        return "";
                    } else {
                        return gH;
                    }
                },
                ejx: function() {
                    var DU = ls.fU.JG(this.Rx, this.hv);
                    this.NT = DU;
                    if (!DU.DqD(this)) {
                        return false;
                    }
                    this.BF.log('ejx', 2, this.Mn);
                    return true;
                },
                cp: function() {
                    var pj = new String(this.DA);
                    delete(this.DA);
                    this.DA = pj;
                    var tB = null;
                    tB = ls.BL.Te(this.qM, false);
                    delete(this.qM);
                    this.qM = tB;
                    var Wj = null;
                    Wj = ls.BL.Te(this.Fw, false);
                    delete(this.Fw);
                    this.Fw = Wj;
                    var Lu = null;
                    Lu = ls.BL.Te(this.ej, false);
                    delete(this.ej);
                    this.ej = Lu;
                    var PN = null;
                    PN = ls.BL.Te(this.Ya, false);
                    delete(this.Ya);
                    this.Ya = PN;
                    if (this.SU) {
                        var jE = null;
                        jE = ls.AC(this.SU, false);
                        delete(this.SU);
                        this.SU = jE;
                    }
                    if (this.JH) {
                        var BT = null;
                        BT = ls.AC(this.JH, false);
                        delete(this.JH);
                        this.JH = BT;
                    }
                    if (this.Cn) {
                        var KJ = null;
                        KJ = ls.nt(this.Cn, false);
                        delete(this.Cn);
                        this.Cn = KJ;
                    }
                },
                ZBk: function(wF, LN, FE) {
                    var uu = this.AE(ls.VisualTable, 'ZBk', wF, LN, FE);
                    this.RF(uu, wF, false);
                    return uu;
                },
                Pw: function(ZI) {
                    var aw = [];
                    if (this.Zu == "COMMAND") {
                        if (!ZI["command"]) {
                            aw.push("command");
                        }
                        if (!ZI["key"]) {
                            aw.push("key");
                        }
                    }
                    for (var Ex in ZI) {
                        if (Ex.indexOf("#") == 0) {} else if (Ex.indexOf("$") == 0 && this.hv.indexOf(ls.Do) > -1) {} else {
                            aw.push(Ex);
                        }
                    }
                    this.ac = new ls.SchemaListDescriptor(aw);
                },
                vf: function(ZI) {
                    var ff = [];
                    for (var Ex in ZI) {
                        if (Ex.indexOf("$") == 0) {
                            ff.push(Ex.substr(1));
                        }
                    }
                    this.Ts = new ls.SchemaListDescriptor(ff);
                },
                qf: function() {
                    var ZI = this.TLZ();
                    if (this.dL) {
                        this.Pw(ZI);
                    }
                    if (this.CE) {
                        this.vf(ZI);
                    }
                    if (this.Ts) {
                        this.ac.Jg(this.Ts);
                    }
                    this.JH = {};
                    for (var Ex in ZI) {
                        var Ms = this.ac.Kq(Ex);
                        this.JH[Ms] = Ex;
                    }
                },
                on: function(uu, cj, df, rb, ah) {
                    var Cs = this.Rx;
                    var hT = ah.LK;
                    var Rg = hT + ah.pE;
                    var uI = Rg + ah.xm;
                    var OF = [];
                    var AS = ls.fU;
                    var Sk = ls.FD;
                    var Dr = ls.Qv;
                    var aj = this.NT;
                    var Mm = aj.pJ.US(cj);
                    var Ca = aj.ge.US(cj);
                    if (Mm != null) {
                        aj.EA.insertRow(Mm, cj);
                        aj.pJ.Lb(cj);
                        aj.tW.insertRow(Ca, cj);
                        aj.ge.Lb(cj);
                    } else {
                        Mm = aj.EA.US(cj);
                        Ca = aj.tW.US(cj);
                    }
                    var wg = false;
                    var Gm;
                    var Vw;
                    var Dn;
                    var db;
                    if (Mm != null) {
                        if (Mm["backgroundColor"]) {
                            wg = true;
                            Gm = Mm["backgroundColor"];
                            Vw = Ca["backgroundColor"];
                        }
                        if (Mm["color"]) {
                            wg = true;
                            Dn = Mm["color"];
                            db = Ca["color"];
                        }
                    }
                    var le = this.ej.US(uu);
                    for (var cR in le) {
                        var JM = le[cR];
                        var Td = this.Ya.Fe(uu, cR);
                        if (JM == null && Td) {
                            this.ej.fS(Td, uu, cR);
                        } else {
                            this.ej.fS(JM, uu, cR);
                            this.Ya.fS(JM, uu, cR);
                        }
                        if (this.ej.Fe(uu, cR) == null) {
                            if (!rb) {
                                continue;
                            }
                        }
                        var WH = this.JH[cR];
                        if (WH == null) {
                            continue;
                        }
                        var vq = aj.Auv(cj, WH);
                        if (vq == null) {
                            var uT = document.createElement("div");
                            vq = new ls.qu(uT);
                            aj.insertCell(vq, cj, WH);
                        }
                        if (this.hv == ls.oa) {
                            vq.TG = JM;
                        }
                        vq.Qh = vq.FW;
                        vq.oD = vq.sq;
                        vq.FW = null;
                        vq.sq = null;
                        vq.HM++;
                        if (vq.Qh || (aj.EA.US(cj) != null)) {
                            var UT = false;
                            var Ml = false;
                            var LA = false;
                            var mZ = Gm;
                            var GW = Vw;
                            var as = Dn;
                            var tI = db;
                            if (vq.Qh) {
                                if (vq.Qh["backgroundColor"]) {
                                    UT = true;
                                    mZ = vq.Qh["backgroundColor"];
                                    GW = vq.oD["backgroundColor"];
                                }
                                if (vq.Qh["color"]) {
                                    UT = true;
                                    as = vq.Qh["color"];
                                    tI = vq.oD["color"];
                                }
                            }
                            if (UT || wg) {
                                if (ah.LK > 0) {
                                    var bn = Sk.mp(AS.WR, AS, [Cs, uu, cj, df, cR, rb, this.uO]);
                                    var UV = Dr.mI(vq, false, mZ, as, ah.LK, bn);
                                    Dr.Of(UV);
                                    Ml = true;
                                } else {
                                    Dr.eF(vq);
                                }
                                if (ah.xm > 0) {
                                    var WH = this.JH[cR];
                                    var Kr = Sk.mp(AS.us, AS, [Cs, cj, df, WH, false, vq.HM]);
                                    var UV = Dr.mI(vq, true, GW, tI, ah.xm, Kr);
                                    Sk.fx(Dr.Of, Rg, Dr, [UV]);
                                    LA = true;
                                }
                            }
                            if (!Ml) {
                                var mh = [Cs, uu, cj, df, cR, rb, this.uO];
                                if (hT > 0) {
                                    Sk.fx(AS.WR, hT, AS, mh);
                                } else {
                                    var oj = Sk.mp(AS.WR, AS, mh);
                                    OF.push(oj);
                                }
                            }
                            if (!LA) {
                                Sk.fx(AS.us, uI, AS, [Cs, cj, df, WH, false, vq.HM]);
                            }
                        } else {
                            var mh = [Cs, uu, cj, df, cR, rb, this.uO];
                            if (hT > 0) {
                                Sk.fx(AS.WR, hT, AS, mh);
                            } else {
                                var oj = Sk.mp(AS.WR, AS, mh);
                                OF.push(oj);
                            }
                        }
                    }
                    for (var vT = 0; vT < OF.length; vT++) {
                        Sk.bu(OF[vT]);
                    }
                }
            };
            ls.Ou(ls.VisualTable, ls.Table);
        })(Lightstreamer);
        (function(ls) {
            ls.WA = function() {};
            ls.WA.OB = function(hB, mX) {
                return hB - mX;
            };
            ls.WA.prototype = {
                gr: function() {
                    if (this.hv.indexOf(ls.LW) > -1) {
                        if (this.dL) {
                            this.jA = null;
                            this.keyCode = null;
                        }
                        if (this.jA == null) {
                            this.jA = this.ac.Zx("command");
                        }
                        if (this.keyCode == null) {
                            this.keyCode = this.ac.Zx("key");
                        }
                        if (this.keyCode == null) {
                            this.BF.error("Key position is not set correctly for a COMMAND mode subscription. Please specify a field that represents the Key", "addTable");
                        } else if (this.jA == null) {
                            this.BF.error("Command position is not set correctly for a COMMAND mode subscription. Please specify a field that represents the Command", "addTable");
                        }
                    }
                },
                dc: function(gg, Gj) {
                    this.BF.log('dc', arguments);
                    if (this.Opv()) {
                        this.BF.kE(this.HR, "setMetapushFields");
                    }
                    this.jA = this.sD(gg, "setMetapushFields", this.jA, true, 1);
                    this.keyCode = this.sD(Gj, "setMetapushFields", this.keyCode, true, 1);
                },
                hva: function(wF, bM, FE) {
                    var uu;
                    if ((typeof wF[this.keyCode + 1] == "undefined") || (typeof wF[this.jA + 1] == "undefined")) {
                        this.BF.aG("Command or Key position is not set correctly", "Server Update");
                        return null;
                    }
                    if (wF[this.keyCode + 1].length == -1) {
                        uu = bM + "|" + this.qM.Fe(bM, this.keyCode);
                    } else {
                        uu = bM + "|" + wF[this.keyCode + 1];
                    }
                    if (!FE) {
                        wF.Yj = [];
                        for (var GN = 2; GN < wF.length; GN++) {
                            if (wF[GN] && wF[GN].length == -1) {
                                wF[GN] = this.qM.Fe(bM, (GN - 1));
                            } else {
                                this.qM.fS(wF[GN], bM, (GN - 1));
                            }
                            if (wF[GN] == this.qM.Fe(uu, (GN - 1))) {
                                wF[GN] = ls.Nu;
                            } else {
                                wF.Yj.push(GN - 1);
                            }
                        }
                        if (this.hv.indexOf(ls.Do) > -1) {
                            var jm = this.ac.length + this.ac.iq.length + 2;
                            if (jm > wF.length) {
                                for (var GN = wF.length; GN < jm; GN++) {
                                    wF[GN] = ls.Nu;
                                }
                            }
                        }
                    } else {
                        wF[this.keyCode + 1] = ls.Nu;
                        if (wF[this.jA + 1] == this.qM.Fe(uu, this.jA)) {
                            wF[this.jA + 1] = ls.Nu;
                        } else {
                            wF.Yj.push(this.jA);
                            wF.Yj.sort(ls.WA.OB);
                        }
                    }
                    return uu;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Tm = function() {};
            ls.Tm.prototype = {
                kG: function() {
                    this.BF.log('kG');
                    this.qf();
                    this.gr();
                },
                VO: function(Qp, PY, MY, qa) {
                    this.BF.log('VO', arguments);
                    if (!Qp) {
                        this.cE = null;
                        return;
                    }
                    this.cE = this.ac.Kq(Qp);
                    if (PY) {
                        this.PY = true;
                    } else {
                        this.PY = false;
                    }
                    if (MY) {
                        this.MY = true;
                    } else {
                        this.MY = false;
                    }
                    if (qa) {
                        this.qa = true;
                    } else {
                        this.qa = false;
                    }
                    if (this.Opv() && this.hv.indexOf(ls.iw) > -1) {
                        this.DP();
                    }
                },
                XoK: function() {
                    if (!this.cE || typeof(this.cE) == "string") {
                        return null;
                    } else {
                        return this.cE;
                    }
                },
                mpD: function() {
                    if (this.cE == null) {
                        return null;
                    } else {
                        return this.ac.we(this.cE);
                    }
                },
                bYj: function() {
                    if (this.cE == null) {
                        return null;
                    } else {
                        return this.PY;
                    }
                },
                tus: function() {
                    if (this.cE == null) {
                        return null;
                    } else {
                        return this.MY;
                    }
                },
                Cuw: function() {
                    if (this.cE == null || !this.MY) {
                        return null;
                    } else {
                        return this.qa;
                    }
                },
                Nsm: function() {
                    return this.jA;
                },
                oVL: function() {
                    return this.keyCode;
                },
                DTJ: function(gH) {
                    if (this.MY) {
                        return ls.YG(gH, this.qa);
                    } else {
                        return gH;
                    }
                },
                CLF: function(eW, Tu) {
                    if (eW == null || Tu == null) {
                        if (eW != Tu) {
                            if (eW == null) {
                                return !this.PY;
                            } else {
                                return this.PY;
                            }
                        }
                    }
                    if (this.PY) {
                        return eW > Tu;
                    } else {
                        return eW < Tu;
                    }
                }
            };
            ls.Ou(ls.Tm, ls.WA, "O");
        })(Lightstreamer);
        (function(ls) {
            ls.lf = function() {};
            ls.lf.prototype = {
                CN: function(xH) {
                    var UN = this.hv.indexOf(ls.XW) > -1;
                    if (xH != null) {
                        this.Ts = ls.SchemaDescriptor.Sh(xH);
                    } else if (!UN) {
                        this.CE = true;
                    } else {
                        this.BF.kE("You must specify the under schema for NonVisualTable objects", "NonVisualTable");
                    }
                    var cA = UN ? "NonVisualTable" : "MultiDynaMetapushTable";
                    if (!(((this.dL || this.ac.getList) && (this.CE || (this.Ts && this.Ts.getList))) || (this.ac.getId && (this.Ts && this.Ts.getId)))) {
                        this.BF.kE("Schema and UnderSchema should be of the same type", "MultiDynaMetapushTable");
                    }
                },
                eM: function() {
                    for (var GN in this.eK) {
                        for (var Ar in this.eK[GN]) {
                            this.iJ(GN, Ar);
                        }
                    }
                },
                pv: function(wF) {
                    var bM = wF[1];
                    var hi = (wF[this.keyCode + 1].length == -1) ? this.qM.Fe(bM, this.keyCode) : wF[this.keyCode + 1];
                    var rV = wF[this.jA + 1];
                    if (this.eK[bM] && this.eK[bM][hi] && rV == "DELETE") {
                        this.iJ(bM, hi);
                    } else if ((!this.eK[bM] || !this.eK[bM][hi]) && rV != "DELETE") {
                        var DX = new ls.NonVisualTable(hi, this.Ts, "MERGE");
                        DX.setDataAdapter(this.wK);
                        DX.setSnapshotRequired(true);
                        DX.hU = this.Ef;
                        DX.tw = bM;
                        DX.hv = ls.pY;
                        DX.oT = this;
                        if (!this.eK[bM]) {
                            this.eK[bM] = {};
                        }
                        this.eK[bM][hi] = DX;
                        ls.jD.SkS(DX, this.getId() + "$" + bM + "|" + hi);
                    }
                },
                iJ: function(bM, uu) {
                    if (this.qb == ls.Xnh) {
                        this.eK[bM][uu].Fja();
                    }
                    ls.jD.XfF(this.eK[bM][uu].getId());
                    delete(this.eK[bM][uu]);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.FM = function() {};
            ls.FM.prototype = {
                aqD: function() {
                    this.BF.log('aqD', 1, this);
                    var Rx = this.Rx;
                    ls.fU.aT(Rx);
                    var dl;
                    var IE = ls.fU.BQ[Rx];
                    if (IE) {
                        if (IE.cm) {
                            dl = IE.Ug;
                            IE.Ug = [];
                        } else {
                            dl = ls.qu.PL(IE.dF, IE.rF);
                        }
                    } else {
                        dl = ls.qu.PL(document, ls.ScreenTableHelper.DR);
                    }
                    var DX = ls.fU.JG(Rx);
                    var Ar = 0;
                    for (Ar = 0; Ar < dl.length; Ar++) {
                        var Cs = dl[Ar].jZ.getAttribute("table");
                        if (!Cs || Cs != Rx) {
                            continue;
                        }
                        var nw;
                        if (this.hv == ls.mD) {
                            var Wl = dl[Ar].jZ.getAttribute("lsitem");
                            if ((Wl == null) || (Wl == "")) {
                                Wl = dl[Ar].jZ.getAttribute("item");
                                if ((Wl == null) || (Wl == "")) {
                                    continue;
                                }
                            }
                            nw = Wl;
                        } else {
                            var LB = dl[Ar].jZ.getAttribute("row");
                            if ((LB == null) || (LB == "")) {
                                LB = dl[Ar].jZ.getAttribute("position");
                            }
                            if ((LB == null) || (LB == "")) {
                                continue;
                            }
                            nw = Number(LB);
                            if (isNaN(nw)) {
                                continue;
                            }
                        }
                        var Ex = dl[Ar].jZ.getAttribute("field");
                        if ((Ex == null) || (Ex == "")) {
                            continue;
                        }
                        var oF = DX.Auv(nw, Ex);
                        if (oF && oF.jZ == dl[Ar].jZ) {
                            continue;
                        }
                        var bL = dl[Ar].Rl();
                        var Mr = dl[Ar].jZ.className;
                        DX.Ia.fS(Mr, nw, Ex);
                        DX.vj.fS(bL, nw, Ex);
                        DX.lSC(dl[Ar], nw, Ex, this.hv);
                    }
                    if (DX.Qo <= 0) {
                        this.BF.error("No cells defined for table " + Rx, "addTable");
                        return false;
                    }
                    return true;
                },
                TLZ: function() {
                    var nP = this.NT.tke();
                    var ZI = {};
                    for (var Wl in nP) {
                        for (var Ex in nP[Wl]) {
                            ZI[Ex] = 1;
                        }
                    }
                    return ZI;
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.hr = function() {};
            ls.hr.prototype = {
                kJ: function() {
                    var nP = this.NT.tke();
                    for (var Dk in nP) {
                        if (this.onRowUpdate) {
                            try {
                                this.onRowUpdate(Dk, null);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onRowUpdate, "onRowUpdate");
                            }
                        }
                        for (var oG in nP[Dk]) {
                            this.NT.lih(Dk, oG);
                        }
                        this.NT.Co(Dk, false);
                    }
                },
                he: function(pH, Zt, KZ, lO) {
                    if (pH == Zt) {
                        return;
                    }
                    var gG;
                    var hV;
                    var Bq;
                    if (!KZ) {
                        gG = Zt;
                        hV = pH;
                        Bq = -1;
                    } else {
                        gG = pH;
                        hV = Zt;
                        Bq = 1;
                    }
                    for (var uu in this.NT.IP) {
                        if (this.NT.IP[uu] < pH || this.NT.IP[uu] > Zt) {
                            continue;
                        }
                        var GK = -1;
                        if (lO && this.NT.IP[uu] == gG) {
                            GK = hV;
                        } else {
                            GK = this.NT.IP[uu] - Bq;
                        }
                        if (GK < pH || GK > Zt) {
                            continue;
                        }
                        this.NT.Bp[GK] = uu;
                        this.NT.IP[uu] = GK;
                        if (this.hv == ls.Nr) {
                            if (GK > this.mJ || GK <= 0) {
                                delete this.NT.Bp[GK];
                                delete this.NT.IP[uu];
                            }
                        }
                    }
                    this.NT.pbo(gG, hV, Bq, lO);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.Un = function() {};
            ls.Un.prototype = {
                kG: function() {
                    this.BF.log('kG');
                    this.qf();
                },
                is: function(kf) {
                    this.BF.log('is', arguments);
                    if (this.Opv()) {
                        this.BF.kE(this.HR, "setUpwardScroll");
                    }
                    if (kf) {
                        this.XF = true;
                    } else {
                        this.XF = false;
                    }
                },
                Ib: function(Cl, uu, oG) {
                    this.aP.push(oG);
                    if (Cl === ls.Nu) {
                        Cl = this.qM.Fe(uu, oG);
                    }
                    this.ej.fS(Cl, uu, oG);
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.bU = function() {};
            ls.bU.prototype = {
                aqD: function() {
                    this.BF.log('aqD', 1, this);
                    var Rx = this.Rx;
                    this.Ew();
                    var Ss = ls.fU.JG(Rx);
                    var ON;
                    var aB = Ss.eu;
                    if (aB) {
                        if (ls.qu.gL(aB)) {
                            return true;
                        } else {
                            Ss.eu = null;
                            Ss.Vn = null;
                            Ss.im = null;
                            Ss.KT = null;
                            Ss.bE = null;
                            Ss.pc = null;
                            Ss.Ag = null;
                        }
                    }
                    aB = document.getElementById(Rx);
                    if (!this.fJC(aB)) {
                        return false;
                    }
                    var bA = aB.cloneNode(true);
                    bA.removeAttribute("id");
                    ON = aB.parentNode;
                    Ss.eu = aB;
                    Ss.vm = ON;
                    Ss.Vn = bA;
                    aB.style.display = "none";
                    var Fc = ON.childNodes;
                    var GN = 0;
                    var LH = 0;
                    for (GN = 0; GN < Fc.length; GN++) {
                        if (Fc[GN] == aB) {
                            if (Fc[GN + 1]) {
                                Ss.im = Fc[GN + 1];
                                Ss.KT = Fc[GN + 1];
                            } else {
                                Ss.im = null;
                                Ss.KT = null;
                            }
                            LH = GN + 1;
                            break;
                        }
                    }
                    if (this.hv == ls.oa) {
                        Ss.bE = ON;
                    } else {
                        Ss.bE = new ls.Ht(Ss.vm, Ss.KT, LH);
                        Ss.pc = new ls.KO();
                        Ss.Ag = new ls.KO();
                    }
                    return true;
                },
                fJC: function(Vn) {
                    if (!Vn) {
                        this.BF.error("No template defined for table " + this.Rx, "addTable");
                        return false;
                    }
                    var Li = Vn.getAttribute(ls.lN);
                    if (!Li || Li.toUpperCase() != ls.Sv) {
                        this.BF.error("The template defined for table " + this.Rx + " does not define the 'source' attribute.", "addTable");
                        return false;
                    }
                    var WT = [];
                    var qQ = false;
                    var dl = ls.qu.PL(Vn);
                    for (var So = 0; So < dl.length; So++) {
                        if (!dl[So].jZ.getAttribute("FIELD")) {
                            if (!qQ) {
                                this.BF.error("Warning, there are elements in the template for table " + this.Rx + " that do not define the 'field' attribute", "addTable");
                                qQ = true;
                            }
                        } else {
                            WT.push(dl[So]);
                        }
                    }
                    if (WT.length <= 0) {
                        this.BF.error("No valid cells defined for table " + this.Rx, "addTable");
                        return false;
                    }
                    return true;
                },
                TLZ: function() {
                    var Vn = this.NT.Vn;
                    var dl = ls.qu.PL(Vn);
                    var ZI = {};
                    var Ar = 0;
                    for (Ar = 0; Ar < dl.length; Ar++) {
                        var Ex = dl[Ar].jZ.getAttribute("FIELD");
                        if (Ex) {
                            ZI[Ex] = 1;
                        }
                    }
                    return ZI;
                },
                ul: function(Eo, Yu) {
                    this.BF.log('ul', arguments);
                    if (!Eo) {
                        this.BF.kE("No type selected, please select one: OFF, ELEMENT, PAGE", "setAutoScroll");
                        return;
                    }
                    Eo = new String(Eo);
                    Eo = Eo.toUpperCase();
                    if (Eo == "ELEMENT") {
                        if (!Yu) {
                            this.BF.kE("Please specify an element id in order to use ELEMENT autoscroll", "setAutoScroll");
                            return;
                        } else {
                            this.qK = Yu;
                        }
                    } else if (Eo != "PAGE" && Eo != "OFF") {
                        this.BF.kE(Eo + " is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE", "setAutoScroll");
                        return;
                    }
                    this.DZ = Eo;
                    if (this.Opv()) {
                        this.Ew();
                    }
                },
                Ew: function() {
                    if (this.DZ == "ELEMENT") {
                        if (this.qK && this.qK.appendChild) {} else {
                            var UK = document.getElementById(this.qK);
                            if (!UK) {
                                this.BF.error("Cannot find the element with " + this.qK + " as id.", "setAutoScroll");
                                this.DZ = "OFF";
                            } else {
                                this.qK = UK;
                            }
                        }
                    }
                },
                ql: function(Qg) {
                    this.BF.log('ql', arguments);
                    Qg = new String(Qg);
                    Qg = Qg.toLowerCase();
                    if (Qg == "unlimited") {
                        this.Qg = 0;
                    } else {
                        this.Qg = this.sD(Qg, 'ql', this.Qg, true, 1);
                    }
                },
                bZJ: function() {
                    if (this.Qg == 0) {
                        return "unlimited";
                    }
                    return this.Qg;
                },
                rp: function(jZ) {
                    if (this.DZ == "OFF") {
                        return;
                    }
                    var jr = null;
                    if (this.DZ == "ELEMENT") {
                        jr = this.qK;
                    }
                    var hx = jZ.offsetTop;
                    jZ = jZ.offsetParent;
                    while ((jZ != jr) && (jZ != null)) {
                        hx += jZ.offsetTop;
                        jZ = jZ.offsetParent;
                    }
                    this.BF.log('rp', this.DZ, hx);
                    if (this.DZ == "PAGE") {
                        window.scrollTo(0, hx);
                    } else {
                        this.qK.scrollTop = hx;
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.eA = function() {};
            ls.eA.prototype = {
                Hv: function(Li) {
                    if (Li == null) {
                        return null;
                    } else {
                        return Li.toString();
                    }
                },
                JZj: function(NN) {
                    ls.rG.JZj(parseInt(NN.win), parseInt(NN.ZP), this.Hv(NN.status), NN.connection, NN.context, NN.policy, NN.Eh, parseInt(NN.eJ), NN.DT === true, this.Hv(NN.Cc), this.Hv(NN.Zv));
                },
                Dch: function(NN) {
                    ls.AD.IZ[NN.Dd].Vh(this.Hv(NN.tY), NN.Bi);
                },
                anm: function(NN) {
                    ls.rG.anm(this.Hv(NN.status));
                },
                jXu: function(NN) {
                    ls.rG.UJc(ls.sg(NN.Pq), this.Hv(NN.Cc), this.Hv(NN.Zv));
                },
                MEa: function(NN) {
                    ls.rG.Fdr(ls.sg(NN.Pq));
                },
                tat: function(NN) {
                    ls.rG.St(NN.BK === true);
                },
                jc: function() {
                    if (ls.CR.NL()) {
                        ls.FD.fx(ls.CR.NL, 1000, ls.CR);
                    }
                },
                kUH: function(NN) {
                    ls.jD.lDj(this.Hv(NN.dC), parseInt(NN.JL), parseInt(NN.uO), parseInt(NN.tq));
                },
                ooe: function(NN) {
                    var wF = NN.wF;
                    var at = [];
                    at.Yj = [];
                    at[0] = parseInt(wF[0]);
                    at[1] = parseInt(wF[1]);
                    for (var GN = 2, lC = wF.length; GN < lC; GN++) {
                        if (!wF[GN]) {
                            if (wF[GN] === "") {
                                at[GN] = "";
                            } else {
                                at[GN] = null;
                            }
                            at.Yj.push(GN - 1);
                        } else if (wF[GN].length == -1) {
                            at[GN] = ls.Nu;
                        } else {
                            at[GN] = wF[GN].toString();
                            at.Yj.push(GN - 1);
                        }
                    }
                    ls.fU.WX(at, NN.LN ? true : false);
                },
                HTi: function(NN) {
                    var at = [];
                    at[0] = parseInt(NN[0]);
                    at[1] = parseInt(NN[1]);
                    at[2] = parseInt(NN[2]);
                    ls.fU.onLostUpdates(at);
                },
                kut: function(NN) {
                    var at = [];
                    at[0] = parseInt(NN[0]);
                    at[1] = parseInt(NN[1]);
                    ls.fU.onEndOfSnapshot(at);
                },
                Bub: function(NN) {
                    ls.fU.qc(parseInt(NN.Pg), this.Hv(NN.xI), parseInt(NN.JL));
                },
                Oc: function(NN) {
                    ls.rG.px("onServerError", parseInt(NN.Pg), this.Hv(NN.xI));
                },
                iOw: function(NN) {
                    ls.fU.nG(parseInt(NN.Pg), parseInt(NN.JL));
                },
                TMH: function(NN) {
                    ls.rG.px("onClientAlert", parseInt(NN.Ax), this.Hv(NN.ij));
                },
                vwP: function(NN) {
                    ls.rG.px("onClientError", NN);
                },
                ksL: function(NN) {
                    ls.fU.nG(9, this.Hv(NN));
                },
                dlH: function(NN) {
                    ls.fU.EZ(parseInt(NN.df), parseInt(NN.Ax), this.Hv(NN.xI));
                }
            };
        })(Lightstreamer);
        (function(ls) {
            ls.nM = function() {
                this.BF = ls.kZ.getLogger("EH");
                this.of = 2000;
                this.Kj();
            };
            ls.nM.prototype = {
                Kj: function(Bf) {
                    this.kh = false;
                    this.eJ = null;
                    this.qm = false;
                    this.Gh = false;
                    this.si = false;
                    this.DT = false;
                    this.Ne = null;
                    this.ZP = null;
                    this.sE = Bf ? this.sE + 1 : ls.vb() + 1;
                    this.RE = null;
                    this.jw = false;
                    this.DI = false;
                    this.BF.log('Kj', this);
                },
                toString: function() {
                    return ["[", 'nM', this.Ne, this.qm, this.kh, this.eJ, this.Gh, this.si, this.DT, this.DI, this.ZP, this.sE, this.jw, "]"].join("|");
                },
                ERY: function(jN, Jx) {
                    if (Jx) {
                        return jN == this.sE && Jx == this.ZP;
                    } else {
                        return jN == this.sE;
                    }
                },
                TjM: function() {
                    var NI = false;
                    try {
                        NI = this.RE.Ra.ERY(this.Ne);
                    } catch (Wq) {
                        this.BF.CP(Wq, 'TjM');
                        NI = false;
                    }
                    if (!NI) {
                        this.St();
                    }
                    return NI;
                },
                NQ: function(iu, NN) {
                    return this.iN(iu, NN, false, false);
                },
                VcB: function(iu, NN) {
                    return this.iN(iu, NN, true, false);
                },
                clQ: function(iu, NN) {
                    return this.iN(iu, NN, false, true);
                },
                nKN: function(iu, NN) {
                    return this.iN(iu, NN, true, true);
                },
                iN: function(iu, NN, Bn, ea) {
                    if (!this.kh) {
                        return false;
                    }
                    this.BF.log('iN', iu, Bn);
                    try {
                        if (ea) {
                            var cd = this.RE.Ra.Nru(this.Ne);
                            cd.pk.UM(iu, this.Ne, NN, Bn ? this.ZP : null);
                        } else {
                            this.RE.tX.UM(iu, this.Ne, NN, Bn ? this.ZP : null);
                        }
                    } catch (Wq) {
                        this.lE(Wq);
                        return false;
                    }
                    return true;
                },
                Jaa: function(QO, Wm) {
                    if (this.kh || this.qm) {
                        this.BF.kw(false, 'Jaa', 1);
                    }
                    this.qm = true;
                    this.sE++;
                    this.Gh = Wm === true;
                    try {
                        this.RE = QO;
                        var Ga = null;
                        if (this.Gh) {
                            var Dh = ls.kU(ls.AD.Dh);
                            if (ls.bI.KB) {
                                var QZ = ls.AD.IZ;
                                QZ.Eh.Dh = Dh;
                                Ga = {
                                    Eh: new ls.cD(QZ.Eh),
                                    policy: new ls.Policy(QZ.policy),
                                    connection: new ls.Connection(QZ.connection),
                                    context: new ls.Context(QZ.context)
                                };
                                this.BF.log('Jaa', 1);
                            } else {
                                Ga = {
                                    Dh: Dh
                                };
                                this.BF.log('Jaa', 2);
                            }
                        } else {
                            this.BF.log('Jaa', 3);
                        }
                        var nW = null;
                        QO.tX.UM('EXc', -1, {
                            win: window,
                            uQ: this.sE,
                            nW: Ga
                        });
                    } catch (Wq) {
                        this.Kj(true);
                        ls.AD.CO();
                        return;
                    }
                    var uQ = ls.AD.hh;
                    ls.FD.fx(this.Isi, this.of, this, [uQ]);
                    this.of += 500;
                },
                Isi: function(uQ) {
                    var md = ls.AD;
                    if (uQ == md.hh) {
                        this.Kj(true);
                        this.BF.log('Isi');
                        md.aR(uQ);
                    }
                },
                JZj: function(eb, BV, sA, connection, context, policy, Eh, eJ, Vx, Cc, Zv) {
                    this.kh = true;
                    this.Ne = eb;
                    this.ZP = BV;
                    this.eJ = eJ;
                    if (ls.bI.KB) {
                        this.si = true;
                    }
                    this.of = 2000;
                    ls.AD.hh++;
                    this.DT = Vx;
                    this.BF.log('JZj', this);
                    var AD = ls.AD;
                    ls.bI.si();
                    ls.CR.Ev();
                    var IZ = new ls.iC(this.RE.gA, connection, context, policy, Eh);
                    AD.IZ = IZ;
                    AD.IZ.hD(sA);
                    if (this.DT) {
                        AD.IZ.qe(Cc, Zv);
                    }
                    if (this.Gh && !this.si) {
                        try {
                            AD.onEngineCreation(IZ);
                        } catch (Wq) {
                            this.BF.Ek(Wq, AD.onEngineCreation, "onEngineCreation");
                        }
                    }
                    try {
                        AD.onEngineReady(IZ);
                    } catch (Wq) {
                        this.BF.Ek(Wq, AD.onEngineReady, "onEngineReady");
                    }
                    ls.kZ.SW();
                    this.oL(sA);
                    if (this.DT) {
                        this.Gr();
                    }
                },
                Gr: function() {
                    this.BF.log('Gr');
                    ls.jD.Axj();
                },
                VJ: function() {
                    this.BF.log('VJ');
                    ls.jD.Sfx();
                    ls.fU.XZ();
                },
                UJc: function(Pq, Cc, Zv) {
                    this.BF.kw(!this.DT, 'UJc');
                    this.ZP = Pq;
                    this.DT = true;
                    ls.AD.IZ.qe(Cc, Zv);
                    this.Gr();
                },
                Fdr: function(Pq) {
                    this.ZP = Pq;
                    if (this.DT) {
                        this.DT = false;
                        this.VJ();
                    }
                },
                anm: function(sA) {
                    ls.AD.IZ.hD(sA);
                    this.px("onStatusChange", sA);
                    this.oL(sA);
                },
                oL: function(sA) {
                    if (ls.FlashBridge) {
                        for (var GN in ls.FlashBridge.bridges) {
                            var qp = ls.FlashBridge.bridges[GN];
                            if (qp && qp.lw) {
                                qp.lw(sA);
                            }
                        }
                    }
                },
                px: function(lF, nD, XX) {
                    var IZ = ls.AD.IZ;
                    if (IZ[lF]) {
                        try {
                            IZ[lF](nD, XX);
                        } catch (Wq) {
                            this.BF.Ek(Wq, IZ[lF], lF);
                        }
                    }
                },
                St: function(BK) {
                    this.BF.log('St', BK, this);
                    if (!this.kh) {
                        return;
                    }
                    var Rd = this.Gh && !BK;
                    ls.CR.aZ();
                    ls.CR.Vl = null;
                    this.Kj(true);
                    this.DI = Rd;
                    ls.AD.Psl(BK);
                    this.VJ();
                    var AD = ls.AD;
                    try {
                        AD.onEngineLost();
                    } catch (Wq) {
                        this.BF.Ek(Wq, AD.onEngineLost, "onEngineLost");
                    }
                    this.oL("WAITING");
                    ls.bI.Ce(Rd);
                },
                lE: function(Wq) {
                    if (!this.jw) {
                        this.BF.CP(Wq, 'lE');
                    }
                    this.jw = true;
                    ls.FD.fx(ls.CR.NL, 0, ls.CR);
                },
                noS: function() {
                    if (this.kh && this.Ne) {
                        this.NQ('rZT', this.Ne);
                    }
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.NonVisualTable = function(mt, oB, Pm) {
                this.uW(ls.NonVisualTable, mt, oB, Pm);
                this.Ix();
                this.sa();
                this.hv = ls.XW;
                this.jA = null;
                this.keyCode = null;
                this.wK = null;
                this.eK = {};
                this.Ts = null;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.NonVisualTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "NonVisualTable";
                },
                uoh: function(Rx, uO) {
                    if (!this.AE(ls.NonVisualTable, 'uoh', Rx, uO)) {
                        return false;
                    }
                    if (this.hv == ls.Pr || this.hv == ls.VX) {
                        this.gr();
                        if (this.Ts) {
                            this.ac.Jg(this.Ts);
                        }
                    }
                    return true;
                },
                xFg: function() {
                    this.AE(ls.NonVisualTable, 'xFg');
                    this.ac.Fs();
                },
                HnX: function() {
                    this.AE(ls.NonVisualTable, 'HnX');
                    this.qM = new ls.BL();
                    this.Fw = new ls.BL();
                    this.ej = new ls.BL();
                    this.Ya = new ls.BL();
                },
                gb: function() {
                    this.AE(ls.NonVisualTable, 'gb');
                    if (this.hv == ls.VX) {
                        this.eM();
                    }
                },
                setCommandLogic: function(Pg, gg, Gj, Ts, wK) {
                    if (Pg == "MULTI") {
                        if (!Ts) {
                            this.BF.kE("The schema for the underlying tables cannot be null", "setCommandLogic");
                            return;
                        }
                        this.hv = ls.VX;
                        if (gg) {
                            this.dc(gg, Gj);
                        }
                        this.CN(Ts);
                        this.wK = wK;
                    } else if (Pg) {
                        this.hv = ls.Pr;
                        if (gg) {
                            this.dc(gg, Gj);
                        }
                    } else {
                        this.hv = ls.XW;
                    }
                },
                getUnderlyingSchema: function() {
                    return this.Ts;
                },
                USv: function(wF) {
                    var oT = this.oT;
                    if (!oT.eK[this.tw] || !oT.eK[this.tw][this.eY.ev]) {
                        return null;
                    }
                    var bM = this.tw;
                    var cJ = {};
                    cJ[0] = oT.RD;
                    cJ[1] = bM;
                    cJ.length = 2;
                    cJ.Yj = [];
                    var KX = oT.ac.length + this.ac.length + 2;
                    var y = 2;
                    var GN;
                    for (; cJ.length < KX; cJ.length++) {
                        GN = cJ.length;
                        if (GN == (oT.keyCode + 1)) {
                            cJ[GN] = this.eY.ev;
                        } else if (GN == (oT.jA + 1)) {
                            cJ[GN] = "UPDATE";
                        } else if (GN <= (oT.ac.length + 1)) {
                            cJ[GN] = ls.Nu;
                        } else if (wF[y].length > -1) {
                            cJ[GN] = wF[y];
                            cJ.Yj.push(GN - 1);
                            y++;
                        } else {
                            cJ[GN] = wF[y];
                            y++;
                        }
                    }
                    return cJ;
                }
            };
            ls.Ou(ls.NonVisualTable, ls.Table);
            ls.Ou(ls.NonVisualTable, ls.WA, "O");
            ls.Ou(ls.NonVisualTable, ls.lf, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.OverwriteTable = function(mt, oB, Pm) {
                this.uW(ls.OverwriteTable, mt, oB, Pm);
                this.kB = this.eY ? false : true;
                this.hv = ls.mD;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.OverwriteTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "OverwriteTable";
                },
                xFg: function() {
                    this.AE(ls.OverwriteTable, 'xFg');
                    this.BF.log('xFg');
                    if (this.kB) {
                        this.eY = null;
                    }
                    this.SU = null;
                    this.JH = null;
                },
                kG: function() {
                    this.BF.log('kG');
                    this.un();
                    this.qf();
                },
                bR: function() {
                    this.AE(ls.OverwriteTable, 'bR');
                    var Ss = this.NT;
                    var nP = Ss.tke();
                    for (var Dk in nP) {
                        var Dm = this.eY.Fa(Dk);
                        if (this.onChangingValues) {
                            try {
                                this.onChangingValues(Dm, null, Dk);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                            }
                        }
                        for (var oG in nP[Dk]) {
                            Ss.lih(Dk, oG);
                        }
                    }
                },
                un: function() {
                    var nP = this.NT.tke();
                    if (this.kB) {
                        var qq = [];
                        for (var Wl in nP) {
                            qq[qq.length] = Wl;
                        }
                        this.eY = new ls.GroupListDescriptor(qq);
                    }
                    this.SU = {};
                    for (var Wl in nP) {
                        var IM = this.eY.Fa(Wl);
                        this.SU[IM] = Wl;
                    }
                },
                onChangingValues: function(IM, qB, YF) {
                    return;
                },
                RF: function(bM, wF, xD) {
                    var uu = bM;
                    var Wl = this.SU[bM];
                    if (Wl == null) {
                        return;
                    }
                    var ah = ls.GU;
                    ah.Kj(this, uu, wF, xD);
                    ah.Dk = Wl;
                    if (this.onChangingValues) {
                        var qs = this.eY.wp(bM);
                        try {
                            this.onChangingValues(bM, ah, qs);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                        }
                    }
                    if (!this.Opv()) {
                        return true;
                    }
                    this.on(uu, Wl, uu, false, ah);
                }
            };
            ls.Ou(ls.OverwriteTable, ls.VisualTable);
            ls.Ou(ls.OverwriteTable, ls.FM, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.ScrollTable = function(mt, oB, Pm) {
                this.uW(ls.ScrollTable, mt, oB, Pm);
                this.sa();
                this.mJ = 0;
                this.XD = 1;
                this.nv = 1;
                this.XF = false;
                this.QU = -1;
                this.hv = ls.Nr;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.ScrollTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "ScrollTable";
                },
                HnX: function() {
                    this.AE(ls.ScrollTable, 'HnX');
                    this.XD = 1;
                    this.nv = 1;
                    if (this.NT.mJ > this.QU && this.QU > -1) {
                        this.mJ = this.QU;
                    } else {
                        this.mJ = this.NT.mJ;
                    }
                },
                xFg: function() {
                    this.AE(ls.ScrollTable, 'xFg');
                    this.JH = null;
                },
                bR: function() {
                    this.AE(ls.ScrollTable, 'bR');
                    this.kJ();
                },
                onChangingValues: function(qB) {
                    return;
                },
                onRowUpdate: function(PH, Xv) {
                    return;
                },
                setUpwardScroll: function(kf) {
                    this.is(kf);
                },
                kf: function() {
                    return this.XF;
                },
                setLastVisibleRow: function(PH) {
                    this.QU = this.sD(PH, "setLastVisibleRow", this.QU, true, -1);
                },
                KVC: function() {
                    return this.QU;
                },
                RF: function(bM, wF, xD) {
                    var pH = null;
                    var Zt = null;
                    var gY = null;
                    var JP = null;
                    var ir;
                    var ib;
                    if (!this.XF) {
                        ir = 1;
                        ib = this.nv;
                        if (this.nv < this.mJ) {
                            this.nv++;
                        }
                        pH = ir;
                        Zt = this.mJ;
                    } else {
                        ir = this.mJ;
                        ib = 1;
                        pH = ib;
                        Zt = ir;
                    }
                    var uu = this.XD;
                    this.XD++;
                    this.he(pH, Zt, this.XF, false);
                    var ah = ls.GU;
                    ah.Kj(this, bM, wF, xD);
                    ah.Dk = ir;
                    ah.df = uu;
                    if (this.onChangingValues) {
                        try {
                            this.onChangingValues(ah);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                        }
                    }
                    if (!this.Opv()) {
                        return true;
                    }
                    this.NT.wMx(bM, ir, true);
                    this.NT.IP[uu] = ir;
                    this.NT.Bp[ir] = uu;
                    this.on(bM, ir, uu, true, ah);
                    var bd = ls.Xv;
                    bd.Kj(this, uu, ir);
                    if (this.onRowUpdate) {
                        try {
                            this.onRowUpdate(ir, bd);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onRowUpdate, "onRowUpdate");
                        }
                    }
                    if (!this.Opv()) {
                        return true;
                    }
                }
            };
            ls.Ou(ls.ScrollTable, ls.VisualTable);
            ls.Ou(ls.ScrollTable, ls.FM, "O");
            ls.Ou(ls.ScrollTable, ls.hr, "O");
            ls.Ou(ls.ScrollTable, ls.Un, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.DynaScrollTable = function(mt, oB, Pm) {
                this.uW(ls.DynaScrollTable, mt, oB, Pm);
                this.sa();
                this.Qg = 0;
                this.ZT = 0;
                this.XF = false;
                this.qK = null;
                this.DZ = "OFF";
                this.LY = false;
                this.hv = ls.oa;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.DynaScrollTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "DynaScrollTable";
                },
                HnX: function() {
                    this.AE(ls.ScrollTable, 'HnX');
                    this.ZT = 0;
                    this.LY = false;
                },
                xFg: function() {
                    this.AE(ls.DynaScrollTable, 'xFg');
                    this.BF.log('xFg');
                    this.JH = null;
                },
                bR: function() {
                    this.AE(ls.DynaScrollTable, 'bR');
                    var Ss = this.NT;
                    while (Ss.KV() > 0);
                    Ss.TH = 0;
                    Ss.Km = 1;
                    Ss.XC = [];
                    Ss.KT = this.NT.im;
                },
                setUpwardScroll: function(kf) {
                    this.is(kf);
                },
                kf: function() {
                    return this.XF;
                },
                onChangingValues: function(pI, qB) {
                    return;
                },
                setAutoScroll: function(type, Yu) {
                    this.ul(type, Yu);
                },
                setMaxDynaRows: function(Qg) {
                    this.ql(Qg);
                    if (this.Opv() && this.Qg > 0) {
                        this.NT.nMx(this.Qg);
                    }
                },
                getMaxDynaRows: function() {
                    return this.bZJ();
                },
                RF: function(bM, wF, xD) {
                    var ZL = this.NT;
                    ZL.TH++;
                    var Lp = ZL.TH;
                    var uu = bM;
                    var ah = ls.GU;
                    ah.Kj(this, uu, wF, xD);
                    ah.Dk = Lp;
                    var JU = ZL.bE;
                    var FC = ZL.Vn.cloneNode(true);
                    ZL.XC.push(FC);
                    var UD = this.aMF();
                    dl = ls.qu.PL(FC);
                    var Ar = 0;
                    for (Ar = 0; Ar < dl.length; Ar++) {
                        var tg = dl[Ar];
                        var uD = tg.jZ.getAttribute("FIELD");
                        if (!uD) {
                            continue;
                        }
                        ZL.lSC(tg, Lp, uD, ZL.hv);
                    }
                    if (this.onChangingValues) {
                        try {
                            this.onChangingValues(FC, ah);
                        } catch (Wq) {
                            this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                        }
                    }
                    if (!this.Opv()) {
                        return true;
                    }
                    if (ZL.KT == null || ZL.KT.parentNode == null) {
                        JU.appendChild(FC);
                    } else {
                        JU.insertBefore(FC, ZL.KT);
                    }
                    this.on(uu, Lp, uu, false, ah);
                    if (UD) {
                        this.rp(FC);
                    }
                    if (!this.XF) {
                        ZL.KT = FC;
                    }
                    var JP = null;
                    this.NT.nMx(this.Qg);
                },
                aMF: function() {
                    if (this.DZ == "OFF") {
                        return false;
                    }
                    if (ls.tj()) {
                        return true;
                    }
                    var OO = null;
                    if (this.DZ == "ELEMENT") {
                        OO = this.qK;
                    } else {
                        OO = document.body;
                    }
                    if (OO.scrollTop < this.ZT) {
                        this.LY = true;
                    }
                    this.ZT = OO.scrollTop;
                    if (!this.LY) {
                        return true;
                    }
                    if ((OO.clientHeight + OO.scrollTop) != OO.scrollHeight) {
                        return false;
                    } else {
                        return true;
                    }
                }
            };
            ls.Ou(ls.DynaScrollTable, ls.VisualTable);
            ls.Ou(ls.DynaScrollTable, ls.Un, "O");
            ls.Ou(ls.DynaScrollTable, ls.bU, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.MetapushTable = function(mt, oB, Pm) {
                this.uW(ls.MetapushTable, mt, oB, Pm);
                this.sa();
                this.mJ = 0;
                this.oi = 0;
                this.jA = null;
                this.keyCode = null;
                this.cE = null;
                this.PY = false;
                this.MY = false;
                this.qa = false;
                this.QU = -1;
                this.Cn = {};
                this.hv = ls.LW;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.MetapushTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "MetapushTable";
                },
                HnX: function(Rx, uO) {
                    this.AE(ls.MetapushTable, 'HnX');
                    if (this.NT.mJ > this.QU && this.QU > -1) {
                        this.mJ = this.QU;
                    } else {
                        this.mJ = this.NT.mJ;
                    }
                    this.oi = 0;
                    this.Cn = [];
                    return true;
                },
                xFg: function() {
                    this.AE(ls.MetapushTable, 'xFg');
                    this.BF.log('xFg');
                    this.JH = null;
                },
                bR: function() {
                    this.AE(ls.MetapushTable, 'bR');
                    this.kJ();
                },
                setClearOnAdd: ls.uY,
                getMetapushSortField: function() {
                    return this.XoK();
                },
                getMetapushSortFieldName: function() {
                    return this.mpD();
                },
                isDescendingSort: function() {
                    return this.bYj();
                },
                isNumericSort: function() {
                    return this.tus();
                },
                isCommaAsDecimalSeparator: function() {
                    return this.Cuw();
                },
                setLastVisibleRow: function(PH) {
                    this.QU = this.sD(PH, "setLastVisibleRow", this.QU, true, -1);
                },
                KVC: function() {
                    return this.QU;
                },
                onChangingValues: function(qB) {
                    return;
                },
                onRowUpdate: function(PH, Xv) {
                    return;
                },
                setMetapushFields: function(gg, Gj) {
                    this.dc(gg, Gj);
                },
                setMetapushSort: function(Qp, PY, MY, qa) {
                    this.VO(Qp, PY, MY, qa);
                },
                RF: function(uu, wF, xD) {
                    var mv = this.qM.Fe(uu, this.jA);
                    var PZ = 1;
                    if (this.cE != null) {
                        PZ = this.qM.Fe(uu, this.cE);
                    }
                    var pH = null;
                    var Zt = null;
                    if (mv == "DELETE") {
                        this.he(this.NT.IP[uu], this.oi, true, false);
                        this.BF.kw(!xD, 'RF', 1);
                        var Rb = this.NT.iHv(this.oi);
                        for (var JH in Rb) {
                            this.NT.lih(this.oi, JH);
                        }
                        delete this.NT.Bp[this.oi];
                        delete this.Cn[this.oi];
                        delete this.NT.IP[uu];
                        this.ej.Lb(uu);
                        this.Ya.Lb(uu);
                        this.Fw.Lb(uu);
                        this.qM.Lb(uu);
                        if (this.oi > this.mJ) {
                            this.NT.Co(this.oi, true);
                        } else {
                            this.NT.Co(this.oi, false);
                        }
                        if (this.onRowUpdate) {
                            try {
                                this.onRowUpdate(this.oi, null);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onRowUpdate, "onRowUpdate");
                            }
                        }
                        if (!this.Opv()) {
                            return true;
                        }
                        this.oi--;
                    } else {
                        PZ = this.DTJ(PZ);
                        var mB = this.NT.IP[uu];
                        var kT = true;
                        if (mB) {
                            var NM = this.Cn[mB];
                            if (NM.toString() == PZ.toString()) {
                                kT = false;
                            }
                        } else {
                            mB = -1;
                            this.oi++;
                        }
                        var rb = (mB == -1);
                        var GK = mB;
                        if (kT) {
                            GK = 1;
                            var Dk;
                            for (Dk = 1; Dk <= this.oi; Dk++) {
                                if (Dk == mB) {
                                    continue;
                                }
                                var iS = this.Cn[Dk];
                                if (!iS) {
                                    break;
                                }
                                if (this.CLF(PZ, iS)) {
                                    break;
                                }
                                GK++;
                            }
                            if (GK != mB) {
                                var KZ = false;
                                var pM = false;
                                if (!rb) {
                                    pM = true;
                                    if (GK < mB) {
                                        pH = GK;
                                        Zt = mB;
                                    } else {
                                        pH = mB;
                                        Zt = GK;
                                        KZ = true;
                                    }
                                } else {
                                    pH = GK;
                                    Zt = this.oi;
                                }
                                this.he(pH, Zt, KZ, pM);
                                this.NT.IP[uu] = GK;
                                this.NT.Bp[GK] = uu;
                            }
                            this.Cn[GK] = PZ;
                        }
                        var ah = ls.GU;
                        ah.Kj(this, uu, wF, xD);
                        ah.Dk = this.NT.IP[uu];
                        if (this.onChangingValues) {
                            try {
                                this.onChangingValues(ah);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                            }
                        }
                        if (!this.Opv()) {
                            return true;
                        }
                        this.NT.wMx(uu, GK, rb);
                        this.on(uu, this.NT.IP[uu], uu, rb, ah);
                        var bd = ls.Xv;
                        bd.Kj(this, uu);
                        if (this.onRowUpdate) {
                            try {
                                this.onRowUpdate(this.NT.IP[uu], bd);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onRowUpdate, "onRowUpdate");
                            }
                        }
                        if (!this.Opv()) {
                            return true;
                        }
                    }
                }
            };
            ls.Ou(ls.MetapushTable, ls.VisualTable);
            ls.Ou(ls.MetapushTable, ls.FM, "O");
            ls.Ou(ls.MetapushTable, ls.Tm, "O");
            ls.Ou(ls.MetapushTable, ls.hr, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.DynaMetapushTable = function(mt, oB, Pm) {
                this.uW(ls.DynaMetapushTable, mt, oB, Pm);
                this.sa();
                this.jA = null;
                this.keyCode = null;
                this.cE = null;
                this.PY = false;
                this.MY = false;
                this.qa = false;
                this.qK = null;
                this.DZ = "OFF";
                this.Qg = 0;
                this.Ne = 1;
                this.ru = 0;
                this.jB = false;
                this.hv = ls.iw;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.DynaMetapushTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "DynaMetapushTable";
                },
                xFg: function() {
                    this.AE(ls.DynaMetapushTable, 'xFg');
                    this.BF.log('xFg');
                    this.JH = null;
                },
                gb: function() {
                    this.AE(ls.DynaMetapushTable, 'gb');
                    this.Ne = 1;
                    this.ru = 0;
                    this.jB = false;
                },
                bR: function() {
                    this.AE(ls.DynaMetapushTable, 'bR');
                    var lp = null;
                    var Ss = this.NT;
                    for (var uu in Ss.kL) {
                        var lp = Ss.kL[uu];
                        if (this.onChangingValues) {
                            try {
                                this.onChangingValues(lp.FC(), null);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                            }
                        }
                        lp.parentNode.removeChild(lp);
                        Ss.Co(uu, true);
                    }
                    Ss.TH = 0;
                    Ss.KT = Ss.im;
                },
                setClearOnAdd: ls.uY,
                setMetapushFields: function(gg, Gj) {
                    this.BF.log("setMetapushFields", arguments);
                    if (this.Opv()) {
                        this.BF.kE(this.HR, "setMetapushFields");
                    }
                    this.jA = this.sD(gg, "setMetapushFields", this.jA, true, 1);
                    this.keyCode = this.sD(Gj, "setMetapushFields", this.keyCode, true, 1);
                },
                onChangingValues: function(pI, qB) {
                    return;
                },
                setAutoScroll: function(type, Yu) {
                    this.ul(type, Yu);
                },
                setMetapushSort: function(Qp, PY, MY, qa) {
                    this.VO(Qp, PY, MY, qa);
                },
                getMetapushSortField: function() {
                    return this.XoK();
                },
                getMetapushSortFieldName: function() {
                    return this.mpD();
                },
                isDescendingSort: function() {
                    return this.bYj();
                },
                isNumericSort: function() {
                    return this.tus();
                },
                isCommaAsDecimalSeparator: function() {
                    return this.Cuw();
                },
                setMaxDynaRows: function(Qg) {
                    this.ql(Qg);
                    if (this.Opv()) {
                        this.su();
                        this.DP();
                        this.KD(1);
                    }
                },
                getMaxDynaRows: function() {
                    return this.bZJ();
                },
                onCurrentPagesChanged: function(ke) {
                    return;
                },
                goToPage: function(Ne) {
                    if (!this.Opv()) {
                        this.BF.kE(this.fg, "goToPage");
                    }
                    if (this.Qg == 0) {
                        this.BF.kE("Can't switch pages while 'no-page mode' is used", "goToPage");
                    }
                    var uC = new Number(Ne);
                    if (isNaN(uC)) {
                        this.BF.kE("A page number must be provided. " + Ne + " is not a valid value", "goToPage");
                    }
                    if (uC <= 0) {
                        this.BF.kE("A page number must be greater than 0. " + Ne + " is not a valid value", "goToPage");
                    }
                    this.KD(uC);
                },
                getDisplayedPage: function() {
                    if (this.Qg == 0) {
                        return 1;
                    } else {
                        return this.Ne;
                    }
                },
                getCurrentPages: function() {
                    return this.ru;
                },
                RF: function(uu, wF, xD) {
                    var aj = this.NT;
                    var mv = this.qM.Fe(uu, this.jA);
                    var PZ;
                    if (this.cE != null) {
                        PZ = this.DTJ(this.qM.Fe(uu, this.cE));
                    }
                    var od = null;
                    var bX = null;
                    var JU = aj.bE;
                    var lc = aj.pc;
                    var Ag = aj.Ag;
                    var XH = aj.kL[uu];
                    var UD = true;
                    if (!this.jB || this.Qg > 0) {
                        UD = false;
                    }
                    var Nv = false;
                    var FC = null;
                    if (mv == "DELETE") {
                        UD = false;
                        if (XH) {
                            aj.TH--;
                            Nv = true;
                            if (this.onChangingValues) {
                                try {
                                    this.onChangingValues(XH.FC(), null);
                                } catch (Wq) {
                                    this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                                }
                            }
                            if (!this.Opv()) {
                                return true;
                            }
                            if (XH.parentNode == JU) {
                                JU.removeChild(XH);
                                this.Mh(lc, JU, this.Qg);
                            } else if (XH.parentNode == lc) {
                                lc.removeChild(XH);
                            } else {
                                Ag.removeChild(XH);
                                if (this.Mh(JU, Ag, this.Qg * (this.Ne - 1))) {
                                    this.Mh(lc, JU, this.Qg);
                                }
                            }
                            this.BF.kw(!xD, 'RF', 3);
                            this.ej.Lb(uu);
                            this.Ya.Lb(uu);
                            this.Fw.Lb(uu);
                            this.qM.Lb(uu);
                            aj.Co(uu, true);
                        }
                    } else {
                        var Fh = false;
                        var Lj;
                        if (!XH) {
                            FC = new ls.ix(this.Rx, uu, uu, this.keyCode);
                            aj.kL[uu] = FC;
                        } else {
                            FC = aj.kL[uu];
                            od = FC.parentNode;
                            Lj = this.pjs(FC);
                            if (this.cE != null) {
                                if (Lj != null && PZ != null) {
                                    if (Lj.toString() == PZ.toString()) {
                                        Fh = true;
                                    }
                                } else if (Lj == null && PZ == null) {
                                    Fh = true;
                                }
                            }
                        }
                        var ah = ls.GU;
                        ah.Kj(this, uu, wF, xD);
                        ah.Dk = uu;
                        if (this.onChangingValues) {
                            try {
                                this.onChangingValues(FC.FC(), ah);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onChangingValues, "onChangingValues");
                            }
                        }
                        if (!this.Opv()) {
                            return true;
                        }
                        if (this.cE != null && Fh == false) {
                            aj.pK[uu] = PZ;
                            var BR = 1;
                            var Va = aj.TH;
                            var KI = -1;
                            var Ar = -1;
                            while (BR < Va) {
                                Ar = Math.floor((BR + Va) / 2);
                                var gM = null;
                                if (Ar <= aj.TH) {
                                    var wP = this.MxH(Ar);
                                    if (wP == FC) {
                                        gM = Lj;
                                        KI = Ar;
                                    } else {
                                        gM = this.pjs(wP);
                                    }
                                }
                                if (this.CLF(PZ, gM)) {
                                    Va = Ar - 1;
                                } else {
                                    BR = Ar + 1;
                                }
                            }
                            var Dp = -1;
                            if (BR == Va) {
                                var wP = this.MxH(BR);
                                var iS = this.pjs(wP);
                                if (this.CLF(PZ, iS)) {
                                    Dp = BR;
                                } else {
                                    Dp = BR + 1;
                                }
                            } else {
                                Dp = BR;
                            }
                            this.lI(Dp, FC);
                            if (!XH) {
                                aj.TH++;
                                Nv = true;
                            }
                        }
                        if (this.cE == null) {
                            if (!XH) {
                                aj.TH++;
                                Nv = true;
                                if (lc.length > 0 || (JU.length == this.Qg && this.Qg > 0)) {
                                    lc.appendChild(FC);
                                } else if (JU.length > 0 || Ag.length == (this.Qg * (this.Ne - 1))) {
                                    JU.appendChild(FC);
                                } else {
                                    Ag.appendChild(FC);
                                }
                            }
                        }
                        this.on(uu, uu, uu, false, ah);
                    }
                    if (FC) {
                        if (FC.Jb) {
                            if (UD) {
                                this.rp(FC.Jb);
                            }
                        }
                    }
                    if (Nv) {
                        this.su();
                    }
                },
                DP: function() {
                    var XM = this.cE;
                    var Vu = new ls.KO();
                    var nR = this.NT;
                    var JU = nR.bE;
                    var lc = nR.pc;
                    var Ag = nR.Ag;
                    var x = 1;
                    while (nR.TH > 0) {
                        var ds = this.MxH(x);
                        if (!ds) {
                            nR.TH--;
                            x++;
                            continue;
                        }
                        if (XM == null) {
                            Vu.appendChild(ds);
                            nR.TH--;
                            continue;
                        }
                        var qV = ds.uu;
                        if (qV == "") {
                            nR.TH--;
                            x++;
                            continue;
                        }
                        var PZ = this.qM.Fe(qV, this.cE);
                        PZ = this.DTJ(PZ);
                        nR.pK[qV] = PZ;
                        var BR = 0;
                        var Va = Vu.length - 1;
                        while (BR < Va) {
                            var Ar = Math.floor((BR + Va) / 2);
                            var wP = Vu.Gl(Ar);
                            var pA = this.pjs(wP);
                            if (!pA) {
                                this.BF.kw(false, 'DP', 1);
                            }
                            if (this.CLF(PZ, pA)) {
                                Va = Ar - 1;
                            } else {
                                BR = Ar + 1;
                            }
                        }
                        var wP = Vu.Gl(BR);
                        if (BR == Va) {
                            var iS = this.pjs(wP);
                            if (this.CLF(PZ, iS)) {
                                Vu.insertBefore(ds, wP);
                            } else {
                                var Aq = Vu.Gl(Va + 1);
                                if (!Aq) {
                                    Vu.appendChild(ds);
                                } else {
                                    Vu.insertBefore(ds, Aq);
                                }
                            }
                        } else {
                            if (wP) {
                                Vu.insertBefore(ds, wP);
                            } else {
                                Vu.appendChild(ds);
                            }
                        }
                        nR.TH--;
                    }
                    var se = 0;
                    while (se < Vu.length) {
                        nR.TH++;
                        var jZ = Vu.Gl(se);
                        var gM = jZ.uu;
                        if (nR.TH <= (this.Qg * (this.Ne - 1))) {
                            Ag.appendChild(jZ);
                        } else if ((this.Qg <= 0) || (nR.TH <= (this.Qg * this.Ne))) {
                            JU.appendChild(jZ);
                        } else {
                            lc.appendChild(jZ);
                        }
                    }
                },
                pjs: function(wP) {
                    if (!wP) {
                        return null;
                    }
                    var iS = wP.uu;
                    if (iS == "") {
                        return null;
                    }
                    return this.NT.pK[iS];
                },
                KD: function(gj) {
                    var OT = this.NT;
                    var JU = OT.bE;
                    var lc = OT.pc;
                    var Ag = OT.Ag;
                    var Du = this.Ne;
                    if (Du >= gj) {
                        while (this.nV(Ag, JU, (gj - 1) * this.Qg)) {
                            this.nV(JU, lc, this.Qg);
                        }
                    } else {
                        while (this.Mh(JU, Ag, (gj - 1) * this.Qg)) {
                            this.Mh(lc, JU, this.Qg);
                        }
                    }
                    this.Ne = gj;
                },
                lI: function(GN, Jb) {
                    var Ss = this.NT;
                    if (GN > Ss.TH + 1) {
                        return;
                    } else if (GN <= 0) {
                        return;
                    }
                    if (Jb == this.MxH(GN)) {
                        return;
                    }
                    var od = Jb.parentNode;
                    var Cq;
                    var JU = Ss.bE;
                    var lc = Ss.pc;
                    var Ag = Ss.Ag;
                    var jQ = this.MxH(GN);
                    if (jQ == null) {
                        if (lc.length > 0 || (JU.length == this.Qg && this.Qg > 0)) {
                            lc.appendChild(Jb);
                            Cq = lc;
                        } else if (this.Qg == 0 || JU.length > 0 || Ag.length == (this.Qg * (this.Ne - 1))) {
                            JU.appendChild(Jb);
                            Cq = JU;
                        } else {
                            Ag.appendChild(Jb);
                            Cq = Ag;
                        }
                    } else {
                        Cq = jQ.parentNode;
                        Cq.insertBefore(Jb, jQ);
                    }
                    if (Cq == JU) {
                        if ((!od) || (od == lc)) {
                            this.nV(JU, lc, this.Qg);
                        } else if (od == Ag) {
                            this.Mh(JU, Ag, this.Qg * (this.Ne - 1));
                        }
                    } else if (Cq == Ag) {
                        if (od != Ag) {
                            if (this.nV(Ag, JU, this.Qg * (this.Ne - 1))) {
                                this.nV(JU, lc, this.Qg);
                            }
                        }
                    } else if (Cq == lc) {
                        if (od == Ag) {
                            this.Mh(JU, Ag, this.Qg * (this.Ne - 1));
                        }
                        this.Mh(lc, JU, this.Qg);
                    }
                },
                Mh: function(UB, TC, Bh) {
                    if (this.Qg <= 0) {
                        return false;
                    }
                    if (TC.length < Bh && UB.length > 0) {
                        var Kd = UB.Gl(0);
                        TC.appendChild(Kd);
                        return true;
                    }
                    return false;
                },
                nV: function(UB, TC, vU) {
                    if (this.Qg <= 0) {
                        return false;
                    }
                    if (UB.length > vU) {
                        var Kd = UB.Gl(UB.length - 1);
                        TC.insertBefore(Kd, TC.Gl(0));
                        return true;
                    }
                    return false;
                },
                MxH: function(GN) {
                    var Ss = this.NT;
                    var JU = Ss.bE;
                    var lc = Ss.pc;
                    var Ag = Ss.Ag;
                    if (GN > Ss.TH) {
                        return null;
                    } else if (GN <= 0) {
                        return null;
                    }
                    if (GN <= Ag.length) {
                        return Ag.Gl(GN - 1);
                    } else {
                        GN -= Ag.length;
                        if (GN <= JU.length) {
                            return JU.Gl(GN - 1);
                        } else {
                            GN -= JU.length;
                            return lc.Gl(GN - 1);
                        }
                    }
                    this.BF.kw(false, 'MxH', GN, this);
                    return null;
                },
                su: function() {
                    var Hk = 0;
                    if (this.Qg <= 0) {
                        Hk = 1;
                    } else {
                        Hk = Math.ceil(this.NT.TH / this.Qg);
                    }
                    if (this.ru != Hk) {
                        this.ru = Hk;
                        if (this.onCurrentPagesChanged) {
                            try {
                                this.onCurrentPagesChanged(this.ru);
                            } catch (Wq) {
                                this.BF.Ek(Wq, this.onCurrentPagesChanged, "onCurrentPagesChanged");
                            }
                        }
                    }
                    return Hk;
                }
            };
            ls.Ou(ls.DynaMetapushTable, ls.VisualTable);
            ls.Ou(ls.DynaMetapushTable, ls.Tm, "O");
            ls.Ou(ls.DynaMetapushTable, ls.bU, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.MultiDynaMetapushTable = function(mt, oB, Pm, xH) {
                this.uW(ls.MultiDynaMetapushTable, mt, oB, Pm);
                this.wK = null;
                this.eK = {};
                this.CE = false;
                this.Ts = null;
                this.hv = ls.bG;
                this.CN(xH);
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.MultiDynaMetapushTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "MultiDynaMetapushTable";
                },
                getUnderlyingSchema: function() {
                    return this.Ts;
                },
                setUnderDataAdapter: function(MN) {
                    this.BF.log("setUnderDataAdapter", arguments);
                    this.wK = MN;
                },
                xFg: function() {
                    this.AE(ls.MultiDynaMetapushTable, 'xFg');
                    this.BF.log('xFg');
                    if (this.CE) {
                        this.Ts = null;
                    }
                },
                gb: function() {
                    this.AE(ls.MultiDynaMetapushTable, 'gb');
                    this.eM();
                }
            };
            ls.Ou(ls.MultiDynaMetapushTable, ls.DynaMetapushTable);
            ls.Ou(ls.MultiDynaMetapushTable, ls.lf, "O");
        })(Lightstreamer);
        (function(ls) {
            ls.wq = function() {};
            ls.wq.prototype = {
                QmM: function(Bi, rU, Bq) {
                    var gH = new Number(Bi);
                    var TK = (gH - rU) / Bq;
                    return Math.round(TK);
                },
                YTw: function(Bi, rU, Bq) {
                    return (Bi * Bq) + rU;
                },
                XS: function() {
                    for (var lC = 0; lC < this.IB.length; lC++) {
                        if (this.IB[lC] && ls.qu.gL(this.IB[lC])) {
                            this.IB[lC].parentNode.removeChild(this.IB[lC]);
                        }
                    }
                    this.IB = [];
                }
            };
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.ChartTable = function(mt, oB, Pm) {
                this.uW(ls.ChartTable, mt, oB, Pm);
                this.sa();
                this.Ix();
                this.Ja = null;
                this.Ur = document.createElement("div");
                this.Ur.style.position = "relative";
                this.Ur.style.overflow = "visible";
                this.offsetY = 0;
                this.offsetX = 0;
                this.screenX = null;
                this.screenY = null;
                this.dA = {};
                this.IB = [];
                this.wL = new ls.LabelFormatter();
                this.dk = false;
                this.es = 0;
                this.Br = null;
                this.EE = null;
                this.bv = null;
                this.gw = null;
                this.hv = ls.oW;
                this.BF.log(this.getClassName(), arguments);
            };
            Lightstreamer.ChartTable.prototype = {
                toString: function() {
                    return ["[", this.getClassName(), this.qb, this.Rx, this.uO, this.RD, this.tq, "]"].join("|");
                },
                getClassName: function() {
                    return "ChartTable";
                },
                JG: function() {
                    return ls.fU.JG(this.Rx, this.hv);
                },
                aqD: function(Rx) {
                    this.BF.log('aqD', 1, this);
                    var Rx = this.Rx;
                    var dl;
                    dl = ls.qu.PL(document, ["div", "span"]);
                    var Ar = 0;
                    for (Ar = 0; Ar < dl.length; Ar++) {
                        var Cs = dl[Ar].jZ.getAttribute("table");
                        if (!Cs || Cs != Rx) {
                            continue;
                        }
                        this.KY(dl[Ar].jZ);
                        return true;
                    }
                    this.dI();
                    return false;
                },
                bR: function() {
                    this.AE(ls.ChartTable, 'bR');
                    this.XS();
                    for (var Zr in this.dA) {
                        this.dA[Zr].XS();
                        delete(this.dA[Zr]);
                    }
                    if (this.Ja && ls.qu.gL(this.Ja)) {
                        this.Ja.parentNode.removeChild(this.Ja);
                    }
                    delete(this.Ja);
                    this.KY(this.Ur.parentNode, true);
                },
                setAreaClass: function(qh) {
                    if (!this.Ja) {
                        this.qh = qh;
                    } else {
                        this.Ja.className = qh;
                    }
                    this.BF.log("setAreaClass", qh);
                },
                setAreaTop: function(top) {
                    this.offsetY = this.sD(top, "setAreaTop", this.offsetY, false, 0);
                    if (this.Ja) {
                        this.Ja.style.top = this.offsetY;
                    }
                },
                setAreaLeft: function(left) {
                    this.offsetX = this.sD(left, "setAreaLeft", this.offsetX, false, 0);
                    if (this.Ja) {
                        this.Ja.style.left = this.offsetX;
                    }
                },
                setAreaWidth: function(width) {
                    this.screenX = this.sD(width, "setAreaWidth", this.screenX, false, 0);
                    if (this.Ja) {
                        this.Ja.style.width = this.screenX;
                        if (this.bv != null) {
                            this.Tk();
                            this.QV();
                            for (var mX in this.dA) {
                                if (!this.dA[mX]) {
                                    continue;
                                } else if (this.dA[mX].va.length > 0) {
                                    this.dA[mX].Mb();
                                }
                            }
                        }
                    }
                },
                setAreaHeight: function(height) {
                    this.screenY = this.sD(height, "setAreaHeight", this.screenY, false, 0);
                    if (this.Ja) {
                        this.Ja.style.height = this.screenY;
                        for (var mX in this.dA) {
                            if (!this.dA[mX]) {
                                continue;
                            } else if (this.dA[mX].Mq != null) {
                                this.dA[mX].SZ();
                                this.dA[mX].Yx();
                                if (this.dA[mX].va.length > 0) {
                                    this.dA[mX].Mb();
                                }
                            }
                        }
                    }
                },
                Yh: function() {
                    this.Ja = document.createElement("div");
                    this.Ja.style.position = "absolute";
                    this.Ja.style.overflow = "hidden";
                    this.Ur.appendChild(this.Ja);
                    if (this.qh) {
                        this.Ja.className = this.qh;
                    }
                    this.Ja.style.top = this.offsetY + "px";
                    this.Ja.style.left = this.offsetX + "px";
                    if (this.screenX !== null) {
                        this.Ja.style.width = this.screenX + "px";
                    }
                    if (this.scrrenY !== null) {
                        this.Ja.style.height = this.screenY + "px";
                    }
                },
                KY: function(qA, sS) {
                    if (this.Ja) {
                        return;
                    }
                    if (qA && qA.appendChild) {
                        this.Yh();
                        if (this.Ur.parentNode != qA) {
                            qA.appendChild(this.Ur);
                        }
                        if (this.screenX == null) {
                            this.screenX = qA.offsetWidth;
                        }
                        if (this.screenY == null) {
                            this.screenY = qA.offsetHeight;
                        }
                        if (this.bv != null) {
                            this.Tk();
                            this.QV();
                        }
                        for (var mX in this.dA) {
                            if (!this.dA[mX]) {
                                continue;
                            } else if (this.dA[mX].Mq != null) {
                                this.dA[mX].SZ();
                                this.dA[mX].Yx();
                            }
                        }
                        this.BF.log('KY', qA);
                    } else if (!sS) {
                        this.dI();
                    }
                },
                dI: function() {
                    this.BF.error("A DOM element must be provided as an anchor for the chart", "addTable");
                },
                LTk: function() {
                    if (this.Ja) {
                        return this.Ja.cloneNode(true);
                    } else {
                        this.BF.error("Sorry, nothing to photograph", 'LTk');
                    }
                },
                removeLine: function(id) {
                    if (this.dA[id]) {
                        this.dA[id].VA();
                        this.dA[id].XS();
                        this.dA[id] = null;
                    } else {
                        this.BF.error("No line to remove with id " + id, "removeLine");
                    }
                },
                bUP: function(ed, FO, Ac, BE) {
                    this.BF.log('bUP', arguments);
                    var ov = document.createElement("div");
                    if (ed != null) {
                        ov.className = ed;
                    }
                    ov.style.position = "absolute";
                    var HX = document.createTextNode(FO);
                    ov.appendChild(HX);
                    this.Ur.appendChild(ov);
                    var DJ = ov.offsetWidth;
                    if (BE.toUpperCase() == "X") {
                        ov.style.top = (this.screenY + 5 + this.offsetY) + "px";
                        ov.style.left = (Ac - (ov.offsetWidth / 2) + this.offsetX) + "px";
                    } else if (BE.toUpperCase() == "Y") {
                        ov.style.left = (this.offsetX - DJ) + "px";
                        ov.style.top = ((this.screenY - Ac) - (ov.offsetHeight / 2) + this.offsetY) + "px";
                    }
                    return ov;
                },
                addLine: function(xa, id) {
                    this.BF.log("addLine", xa);
                    xa.ckW(this);
                    if (this.dA[id] != null) {
                        this.BF.error("A line with this id already exists. Overwriting", "addLine");
                    }
                    xa.BRf(id);
                    xa.IM = this.eY.Fa(xa.lk);
                    xa.uM = this.ac.Kq(xa.VF);
                    if (!xa.Mq || !xa.Se || !xa.uM) {
                        this.BF.kE("Cannot create line. Please declare the Y axis", "addLine");
                        return;
                    }
                    if (this.screenY != null && this.Ja) {
                        xa.SZ();
                        xa.Yx();
                    }
                    this.dA[id] = xa;
                },
                Cu: function(OS, Er, Bu) {
                    this.BF.log('Cu', arguments);
                    var Mc = this.dA[Bu];
                    var re = this.eQS(OS);
                    var Lv = Mc.eof(Er);
                    if (Mc.Zp == null) {
                        Mc.Zp = re;
                        Mc.fR = Lv;
                        return;
                    }
                    this.BF.log('Cu', 0, Mc.Zp, Mc.fR, re, Lv);
                    var rg = re - Mc.Zp;
                    var og = Lv - Mc.fR;
                    this.BF.log('Cu', 1, "X", rg, "Y", og);
                    var YD = Math.abs(rg);
                    var tR = Math.abs(og);
                    var DF = null;
                    var hV = 0;
                    var jV = 0;
                    var kH = 0;
                    if (YD >= tR) {
                        kH = og / rg;
                        hV = rg;
                        jV = rg >= 0 ? 1 : -1;
                    } else {
                        kH = rg / og;
                        hV = og;
                        jV = og >= 0 ? 1 : -1;
                    }
                    var oA = 0;
                    var gn = 0;
                    var XY = null;
                    var TW = null;
                    var RI = true;
                    var kX = true;
                    if (YD < tR) {
                        kX = false;
                    }
                    for (var GN = 0; GN != hV; GN += jV) {
                        var Vs = 0;
                        var qx = 0;
                        var xu = 0;
                        var FX = 0;
                        var fW = false;
                        this.BF.log('Cu', 2);
                        if ((GN + jV) == hV) {
                            this.BF.log('Cu', 6);
                            fW = true;
                            RI = true;
                        }
                        DF = document.createElement("div");
                        if (fW) {
                            DF.className = Mc.nL;
                        } else {
                            DF.className = Mc.RJ;
                        }
                        DF.style.position = "absolute";
                        DF.style.fontSize = "0px";
                        this.Ja.appendChild(DF);
                        Mc.Wk[Mc.Wk.length] = DF;
                        if (RI) {
                            RI = false;
                            XY = Math.ceil(DF.offsetWidth / 2);
                            TW = Math.ceil(DF.offsetHeight / 2);
                            oA = DF.offsetWidth;
                            gn = DF.offsetHeight;
                            this.BF.log('Cu', 3, oA, gn);
                        }
                        xu = oA;
                        FX = gn;
                        if (kX) {
                            Vs = Math.round(GN + Mc.Zp);
                            qx = Math.round(this.screenY - (kH * GN + Mc.fR));
                            if (!fW) {
                                var Ue = 0;
                                while (((GN + jV) != (hV - jV)) && (qx == Math.round(this.screenY - (kH * (GN + jV) + Mc.fR)))) {
                                    GN += jV;
                                    Ue++;
                                }
                                this.BF.log('Cu', 4, Ue);
                                var kV = XY * Ue;
                                xu = oA + kV;
                                if (jV < 0) {
                                    Vs -= kV;
                                }
                            }
                        } else {
                            Vs = Math.round(kH * GN + Mc.Zp);
                            qx = Math.round(this.screenY - (GN + Mc.fR));
                            if (!fW) {
                                var Ue = 0;
                                while (((GN + jV) != (hV - jV)) && (Vs == Math.round(kH * (GN + jV) + Mc.Zp))) {
                                    GN += jV;
                                    Ue++;
                                }
                                this.BF.log('Cu', 5, Ue);
                                var kV = TW * Ue;
                                FX = gn + kV;
                                if (jV > 0) {
                                    qx -= kV;
                                }
                            }
                        }
                        Vs -= Math.floor(XY / 2);
                        qx -= Math.floor(TW / 2);
                        DF.style.left = Vs + "px";
                        DF.style.top = qx + "px";
                        DF.style.width = xu + "px";
                        DF.style.height = FX + "px";
                        this.BF.log('Cu', 7, DF.style.left, DF.style.top, DF.style.width, DF.style.height);
                        this.BF.log('Cu', 8, DF.offsetLeft, DF.offsetTop, DF.offsetWidth, DF.offsetHeight);
                    }
                    this.BF.log('Cu', 10);
                    Mc.Zp = re;
                    Mc.fR = Lv;
                },
                setXAxis: function(field, qa) {
                    this.BF.log("setXAxis", arguments);
                    this.Br = this.ac.Kq(field);
                    if (qa) {
                        this.dk = true;
                    } else {
                        this.dk = false;
                    }
                },
                positionXAxis: function(min, max) {
                    this.BF.log("positionXAxis", arguments);
                    this.bv = this.sD(max, "positionXAxis", this.bv);
                    this.EE = this.sD(min, "positionXAxis", this.EE);
                    if (this.Ja) {
                        if (this.screenX != null) {
                            this.Tk();
                            this.QV();
                        }
                        for (var mX in this.dA) {
                            if (!this.dA[mX]) {
                                continue;
                            } else if (this.dA[mX].va.length > 0) {
                                this.dA[mX].Mb();
                            }
                        }
                    }
                    this.BF.log("positionXAxis", 2);
                },
                Tk: function() {
                    this.gw = (this.bv - this.EE) / this.screenX;
                    this.BF.log('Tk', this.gw);
                },
                setXLabels: function(OI, ox, wL) {
                    this.es = OI;
                    this.Or = ox;
                    if (wL != null) {
                        this.wL = wL;
                    }
                    if (this.gw != null && this.Ja) {
                        this.QV();
                    }
                    this.BF.log("setXLabels", arguments);
                },
                QV: function() {
                    this.XS();
                    var An = "";
                    var Ac = -1;
                    if (this.es <= 0) {
                        return;
                    }
                    if (this.es > 0) {
                        An = this.wL.formatValue(this.EE);
                        Ac = this.eQS(this.EE);
                        this.IB[this.IB.length] = this.bUP(this.Or, An, Ac, "X");
                    }
                    if (this.es > 1) {
                        An = this.wL.formatValue(this.bv);
                        Ac = this.eQS(this.bv);
                        this.IB[this.IB.length] = this.bUP(this.Or, An, Ac, "X");
                    }
                    if (this.es > 2) {
                        var nu = this.es - 1;
                        var Nl = (this.bv - this.EE) / nu;
                        var xq = this.EE;
                        for (var rY = 1; rY < nu; rY++) {
                            xq += Nl;
                            An = this.wL.formatValue(xq);
                            Ac = this.eQS(xq);
                            this.IB[this.IB.length] = this.bUP(this.Or, An, Ac, "X");
                        }
                    }
                    this.BF.log('QV', arguments);
                },
                onXOverflow: function(Zp, ZR, HJ) {
                    this.BF.log("onXOverflow", arguments);
                    if (Zp > HJ) {
                        var xJ = (HJ + ZR) / 2;
                        var LJ = HJ - ZR;
                        this.positionXAxis(xJ, xJ + LJ);
                    } else {}
                },
                eQS: function(Bi) {
                    return this.QmM(Bi, this.EE, this.gw);
                },
                RF: function(bM, wF, xD) {
                    var uu = bM;
                    for (var mX in this.dA) {
                        if (!this.dA[mX]) {
                            continue;
                        } else if (bM == this.dA[mX].IM) {
                            var OK = null;
                            var Bi = this.qM.Fe(bM, this.Br);
                            OK = ls.YG(Bi, this.dk);
                            if (OK < this.EE) {
                                continue;
                            }
                            if (OK > this.bv) {
                                if (this.onXOverflow) {
                                    try {
                                        this.onXOverflow(OK, this.EE, this.bv);
                                    } catch (Wq) {
                                        this.BF.Ek(Wq, this.onXOverflow, "onXOverflow");
                                    }
                                }
                                if (!this.Opv()) {
                                    return;
                                }
                            }
                            var sL = null;
                            var Bi = this.qM.Fe(bM, this.dA[mX].uM);
                            sL = ls.YG(Bi, this.wc);
                            if (sL > this.dA[mX].Mq || sL < this.dA[mX].Se) {
                                if (this.dA[mX].onYOverflow) {
                                    try {
                                        this.dA[mX].onYOverflow(sL, this.dA[mX].Se, this.dA[mX].Mq);
                                    } catch (Wq) {
                                        this.BF.Ek(Wq, this.dA[mX].onYOverflow, "onYOverflow");
                                    }
                                }
                                if (!this.Opv()) {
                                    return;
                                }
                            }
                            var en = this.dA[mX].va.length;
                            this.dA[mX].va[en] = OK;
                            en = this.dA[mX].ka.length;
                            this.dA[mX].ka[en] = sL;
                            this.Cu(OK, sL, mX);
                        }
                    }
                }
            };
            ls.Ou(ls.ChartTable, ls.VisualTable);
            ls.Ou(ls.ChartTable, ls.wq, "O");
        })(Lightstreamer);
        (function(ls) {
            Lightstreamer.ChartLine = function() {
                this.JU = null;
                this.lk = null;
                this.IM = null;
                this.Rx = null;
                this.nL = "";
                this.RJ = "";
                this.wc = false;
                this.Op = null;
                this.uM = null;
                this.Se = null;
                this.Mq = null;
                this.dn = null;
                this.qY = 0;
                this.wL = new ls.LabelFormatter();
                this.Wk = [];
                this.va = [];
                this.ka = [];
                this.IB = [];
                this.Zp = null;
                this.fR = null;
                this.BF = ls.kZ.getLogger("TL");
                this.BF.log("ChartLine", arguments);
            };
            Lightstreamer.ChartLine.prototype = {
                sD: ls.jI,
                VA: function() {
                    this.BF.log('VA', this.Rx);
                    if (this.Wk[0] && ls.qu.gL(this.Wk[0])) {
                        for (var QT = 0; QT < this.Wk.length; QT++) {
                            this.Wk[QT].parentNode.removeChild(this.Wk[QT]);
                        }
                    }
                    this.Wk = [];
                    this.ka = [];
                    this.va = [];
                    this.Zp = null;
                    this.fR = null;
                },
                Mb: function() {
                    this.BF.log('Mb', 1);
                    var Rs = this.va;
                    var Sq = this.ka;
                    this.VA();
                    var od = false;
                    var fj, Xj;
                    while (Rs.length > 0) {
                        if ((Rs.length > 1 && Rs[1] >= this.JU.EE) || Rs[0] >= this.JU.EE) {
                            this.JU.Cu(Rs[0], Sq[0], this.Rx);
                            this.va[this.va.length] = Rs[0];
                            this.ka[this.ka.length] = Sq[0];
                        }
                        Rs.shift();
                        Sq.shift();
                    }
                    this.BF.log('Mb', 2);
                },
                ckW: function(JU) {
                    this.JU = JU;
                    this.BF.log('ckW', JU);
                },
                BRf: function(Rx) {
                    this.Rx = Rx;
                    this.BF.log('BRf', Rx);
                },
                setPointClass: function(GA) {
                    this.nL = GA;
                    this.BF.log("setPointClass", GA);
                },
                setLineClass: function(GO) {
                    this.RJ = GO;
                    this.BF.log("setLineClass", GO);
                },
                setYAxis: function(item, field, qa) {
                    this.BF.log("setYAxis", arguments);
                    this.lk = item;
                    this.VF = field;
                    if (qa) {
                        this.wc = true;
                    } else {
                        this.wc = false;
                    }
                },
                positionYAxis: function(min, max) {
                    this.BF.log("positionYAxis", arguments);
                    this.Mq = this.sD(max, "positionYAxis", this.Mq);
                    this.Se = this.sD(min, "positionYAxis", this.Se);
                    if (this.JU && this.JU.screenY != null && this.JU.Ja && this.JU.Ja.parentNode) {
                        this.SZ();
                        this.Yx();
                        if (this.va.length > 0) {
                            this.Mb();
                        }
                    }
                    this.BF.log("positionYAxis", 2);
                },
                SZ: function() {
                    this.dn = (this.Mq - this.Se) / this.JU.screenY;;
                    this.BF.log('SZ', this.dn);
                },
                setYLabels: function(OI, ox, wL) {
                    this.qY = OI;
                    this.TQ = ox;
                    if (wL != null) {
                        this.wL = wL;
                    }
                    if (this.dn != null && this.JU && this.JU.Ja && this.JU.Ja.parentNode) {
                        this.Yx();
                    }
                    this.BF.log("setYLabels", arguments);
                },
                Yx: function() {
                    this.XS();
                    var An = "";
                    var Ac = -1;
                    if (this.qY <= 0) {
                        return;
                    }
                    if (this.qY > 0) {
                        An = this.wL.formatValue(this.Se);
                        Ac = this.eof(this.Se);
                        this.IB[this.IB.length] = this.JU.bUP(this.TQ, An, Ac, "Y");
                    }
                    if (this.qY > 1) {
                        An = this.wL.formatValue(this.Mq);
                        Ac = this.eof(this.Mq);
                        this.IB[this.IB.length] = this.JU.bUP(this.TQ, An, Ac, "Y");
                    }
                    if (this.qY > 2) {
                        var nu = this.qY - 1;
                        var Nl = (this.Mq - this.Se) / nu;
                        var xq = this.Se;
                        for (var rY = 1; rY < nu; rY++) {
                            xq += Nl;
                            An = this.wL.formatValue(xq);
                            Ac = this.eof(xq);
                            this.IB[this.IB.length] = this.JU.bUP(this.TQ, An, Ac, "Y");
                        }
                    }
                    this.BF.log('Yx', arguments);
                },
                onYOverflow: function(fR, HH, Tw) {
                    this.BF.log("onYOverflow", arguments);
                    var Rf = (Tw - HH) / 2;
                    if (fR > Tw) {
                        var Iw = Tw + Rf;
                        if (fR > Iw) {
                            Iw = fR;
                        }
                        this.positionYAxis(HH, Iw);
                    } else if (fR < HH) {
                        var nj = HH - Rf;
                        if (fR < nj) {
                            nj = fR;
                        }
                        this.positionYAxis(nj, Tw);
                    }
                },
                eof: function(Bi) {
                    return this.QmM(Bi, this.Se, this.dn);
                }
            };
            ls.Ou(ls.ChartLine, ls.wq, "O");
        })(Lightstreamer);
        Lightstreamer.LabelFormatter = function() {};
        Lightstreamer.LabelFormatter.prototype = {
            formatValue: function(gH) {
                return gH;
            }
        };
        (function(ls) {
            ls.AD = null;
            ls.fU = new ls.Sg();
            ls.rG = new ls.nM();
            ls.Et = new ls.Qe(ls.rG, new ls.eA(), ls.FD, false);
            ls.CR = new ls.ku();
            ls.jD = new ls.Pd(ls.rG);
            var nb = [function() {
                if (ls.AD) {
                    ls.AD.Tc();
                }
            }, function() {
                if (ls.FlashBridge) {
                    ls.FlashBridge.MS();
                }
            }];
            ls.XO = new ls.VT(nb);
            ls.kZ.Qq();
            ls.xL("beforeunload", function() {
                if (ls.AD) {
                    ls.AD.La();
                }
            });
            ls.xL("unload", function() {
                ls.fU.Lm();
                ls.rG.noS();
                ls.Yg = true;
            });
            ls.VG = new ls.Sl();
            ls.JY = new ls.ao();
            ls.bI = new ls.ZY();
            if (ls.CF) {
                ls.Qv = new ls.CF(20);
            }
            ls.hO();
            if (window.Lightstreamer === ls) {
                if (!ls.avoidLSGlobals) {
                    ls.cr();
                }
            } else {
                window.Lightstreamer = ls;
                ls.avoidLSGlobals = true;
            }
            ls.Xv = new ls.RowInfo();
            ls.qB = new ls.UpdateItemInfo();
            ls.GU = new ls.VisualUpdateInfo();
            ls.uX.log("pushpage", "pushpage parsed");
        })(Lightstreamer);
        return Lightstreamer;
    });
})(window.define || function(uU, Wo) {
    Wo(window.Lightstreamer)
});
