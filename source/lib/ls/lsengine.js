/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer HTML Client - lsengine.js
 * Version 5.0 Build 1446 Revision: 29106 $
 * Copyright (c) 2004-2011 Weswit Srl. All Rights Reserved.
 */










if (!window.Lightstreamer) {
    throw ("Warning: lscommons.js not included before lsengine.js\nPlease don't modify the lsengine.html file");
}
Lightstreamer.vs = " 29105 $";
Lightstreamer.uX.log("engine");
(function(ls) {
    ls.ks = function() {
        this.open = false;
    };
    ls.ks.prototype = {
        hpL: function(nr) {
            return frames[nr];
        }
    };
})(Lightstreamer);
var gA = null;
var ki = false;
var Jk = "OFF";
var cT = "PUSH";
var qL = "PAUSE";
var FF = "REFRESH";
var CM = "END";
var MW = null;
var eU = 1;
var Yr = 2;
var an = Lightstreamer.vb(100) * 100;
var pd = Jk;
var GF = "document.domain";
var Tg = null;
var ag = null;

function AF(LZ) {
    uX.QA('AF', LZ);
    pd = LZ;
    gN();
}

function Ih(Zr) {
    var pq = Ra.Rhp("onClientError", 'vwP', Zr);
    if (!pq && gA.onClientError) {
        try {
            gA.onClientError(Zr);
        } catch (Wq) {
            uX.CP(Wq, "onClientError");
        }
    }
}

function gN() {
    var Uf = gA.getStatus();
    if (MW == Uf) {
        return;
    }
    var OZ = Ra.SDA(Uf, MW);
    MW = Uf;
    if (!OZ && gA.onStatusChange) {
        try {
            gA.onStatusChange(Uf);
        } catch (Wq) {
            uX.Ek(Wq, gA.onStatusChange, "onStatusChange");
        }
    }
}

function wd() {
    an++;
    uX.QA('wd', an);
}
Lightstreamer.Vr = function() {
    return "pp = " + an + " pt = " + pd;
};
var MR = true;
var oo = new String(Lightstreamer.vb());
var JV = false;

function UC() {
    if (!Lightstreamer.II) {
        MR = false;
        Lightstreamer.II = true;
        uX.QA('UC');
        if (!gA) {
            uX.aG("You must create and bind a LightstreamerEngine object in order to activate the push functionalities.\nSee documentation for further information", "onLoad");
            return;
        }
        with(Lightstreamer) {
            GF = Ta("" + jFO + sMn + KPN + Tbr + RBl + OOX + MJZ + BSH, "document", 6, 7, 350);
        }
        LS_vF1c = GF;
        if (pd != Jk) {
            uX.kw(false, 'UC');
            return;
        }
        uX.log('UC', document.cookie);
        Lightstreamer.FD.fx(Gn.Gw, 25, Gn);
    }
}
self.LS_onld = UC;

function tl(RS) {
    if (Lightstreamer.Yg) {
        return;
    }
    Lightstreamer.rN = true;
    uX.QA('tl');
    Gc.wh();
    Lightstreamer.II = false;
    if (gA) {
        AF(CM);
    }
    uX.log('tl', document.cookie);
    Lightstreamer.Yg = true;
    Ra.bSL(RS === true);
}
self.LS_onunld = tl;

function jc() {
    Ra.Kjj();
}

function JE() {
    if (Lightstreamer.pW) {
        if (gA) {
            Lightstreamer.fK(gA.wf);
            Lightstreamer.Fb(gA.YR, gA.eJ);
            JV = true;
        }
        so.CU();
    }
}(function(ls) {
    ls.td = function(jU) {
        this.jU = jU;
        this.oX = 0;
        this.DN = null;
        this.gC = 5 / 10;
        this.Vo = 7000;
        this.Ir = 20000;
        this.sW = false;
        this.BF = ls.kZ.getLogger("SL");
        this.no();
    };
    ls.td.prototype = {
        no: function() {
            var Yt = this;
            window.LS_s = function(Pq, ab, Xm, lH, PK) {
                Yt.qPJ(Pq, ab, Xm, lH, PK);
            }
        },
        toString: function() {
            return ["[", 'td', this.DN, this.oX, this.gC, this.Vo, "]"].join("|");
        },
        rco: function(th) {
            return this.DN != null && this.DN > th;
        },
        tnR: function() {
            return this.DN != null ? Math.round(this.DN) : null;
        },
        qPJ: function(Pq, ab, Xm, lH, PK) {
            this.BF.QA('TS', arguments);
            if (Pq != an) {
                return;
            }
            this.BF.kw(pd == cT, 'TS');
            if (ab < 0) {
                ag = PK;
                if (this.jU.fM == Yr) {
                    this.Rr();
                } else {}
                this.XU();
            } else {
                if (this.jU.fM == Yr) {
                    var aq = this.CJ(ab * 1000);
                    if (!aq) {
                        this.jU.APa();
                    } else if (gA.policy.ut) {
                        this.jU.Ru(eU, "slow");
                    }
                }
            }
            this.BF.log('TS', 0);
        },
        XU: function() {
            this.oX = ls.gQ();
        },
        Rr: function() {
            this.DN = null;
            this.sW = false;
        },
        qdq: function() {
            this.sW = false;
        },
        CJ: function(FR) {
            var Ki = ls.gQ();
            var QY = (Ki - this.oX) - FR;
            this.BF.log('CJ', 1, this, FR, QY);
            if (this.DN == null) {
                this.DN = QY;
                return false;
            } else {
                if (QY > this.Ir && QY > this.DN * 2) {
                    this.sW = !this.sW;
                    if (this.sW) {
                        return this.DN > this.Vo;
                    }
                }
                this.DN = this.DN * this.gC + QY * (1 - this.gC);
                this.BF.log('CJ', 2, this);
                if (this.DN < 60) {
                    this.DN = 0;
                    return false;
                } else if (this.rco(this.Vo)) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        rBH: function(FR) {
            this.BF.kw(pd == qL, 'rBH');
            this.CJ(FR);
        }
    };
})(Lightstreamer);

function hc(SD) {
    if (pd != cT) {
        rv.log('hc', 1);
        return true;
    }
    if (SD && SD != Ra.ZP) {
        rv.log('hc', 2, SD, an, Ra.ZP);
        return true;
    }
    if (Lightstreamer.Yg) {
        rv.log('hc', 4);
        return true;
    }
    return false;
}

function LS_e(Pg, Pq, xU, Ed, eo, ZS, FP) {
    if (Lightstreamer.Yg) {
        return;
    }
    rv.QA("LS_e", arguments);
    if (Pq != an) {
        if (Pg == 1 && pd == Jk) {
            rv.log("LS_e", 1);
            Gc.wh();
            Lightstreamer.FD.fx(UC, 1000);
            return;
        } else {
            rv.log("LS_e", 7);
            return;
        }
    }
    gS();
    if (Pg == 2) {
        Gc.bae(xU);
    } else if (Pg == 3) {
        rv.kw(pd == qL || pd == cT, "LS_e", 2);
        Gc.uV.Gfs();
        Gc.NF("server");
    } else if (Pg == 1) {
        rv.kw(pd == FF || pd == qL, "LS_e", 3);
        if (Ed != null) {
            if (Ed != rl) {
                if (!Lightstreamer.Vj(Ed)) {
                    var md = an;
                    rv.aG("Control address received inconsistent with the domain set", "Server");
                    if (md != an) {
                        return;
                    }
                }
                so.CU(AX(rl));
                rl = Ed;
            }
        } else {
            rl = gA.connection.dE;
        }
        Oe = 0;
        so.wDH(AX(rl));
        Ns.IH();
        if (ZS) {
            kC.MuK(ZS);
        }
        if (eo) {
            gA.policy.Vh('xf', eo);
        }
        if (pd == FF) {
            rv.log("LS_e", 2);
            Tg = xU;
            LI = FP;
            Gc.Gr();
            IA.JZu();
        } else {
            Gc.eV();
            rv.log("LS_e", 3);
        }
    } else if (Pg == 4) {
        var Pi = 30;
        if (xU != null) {
            Pi = xU;
            if (Lightstreamer.Ao() && Pi == 41) {
                rv.log("LS_e", 9);
                Gc.NF("android41");
                return;
            }
            if (Pi < 30 || Pi > 39) {
                Pi = 39;
            }
        }
        LS_l(Pi, Pq, null, "The session has been forcibly closed by the Server");
    } else {
        rv.log("LS_e", 4);
        rv.aG("Unsupported Server version", "Server");
        Gc.wh();
    }
    rv.log("LS_e", 0);
}

function LS_t(WM) {}

function LS_u(SD, wF, LN) {
    pP.QA("LS_u", arguments);
    if (wF.length < 2) {
        if (SD != an) {
            return;
        }
        gS();
        return;
    }
    if (hc(SD)) {
        return;
    }
    gS();
    var ud = wF[0];
    var NJ = Ra.QVi(ud);
    if (!NJ) {
        pP.log("LS_u", 1);
        return;
    }
    NJ.VcB('ooe', {
        wF: wF,
        LN: LN
    });
}

function LS_o(SD, wF) {
    rv.QA("LS_o", arguments);
    if (hc(SD)) {
        return;
    }
    gS();
    var ud = wF[0];
    var NJ = Ra.QVi(ud);
    if (!NJ) {
        rv.log("LS_o", 1);
        return;
    }
    NJ.VcB('HTi', wF);
}

function LS_v(SD, wF) {
    Og.QA("LS_v", arguments);
    LS_u(SD, wF, true);
}

function LS_n(SD, wF) {
    rv.QA("LS_n", arguments);
    if (hc(SD)) {
        return;
    }
    gS();
    var ud = wF[0];
    var NJ = Ra.QVi(ud);
    if (!NJ) {
        rv.log("LS_n", 1);
        return;
    }
    NJ.VcB('kut', wF);
}

function LS_l(Pg, Pq, ud, xI) {
    rv.QA("LS_l", arguments);
    if (Lightstreamer.Yg) {
        rv.log("LS_l", 1);
        return true;
    }
    if (ud != null) {
        if (isNaN(ud)) {
            rv.kw(ud.substring(0, 3) == "MSG", "LS_l", 1);
            var iO = ud.substr(3);
            gS();
            if (Pg == 39) {
                var vN = new Number(xI);
                for (var GN = Pq - vN + 1; GN <= Pq; GN++) {
                    IA.Mg(iO, GN, 38, null);
                }
            } else if (Pg == 38) {
                IA.Mg(iO, Pq, 38, null);
            } else {
                IA.Mg(iO, Pq, Pg, xI);
            }
        } else {
            if (hc(Pq)) {
                return;
            }
            gS();
            var NJ = Ra.QVi(ud);
            if (!NJ) {
                rv.log("LS_l", 2);
                return;
            }
            NJ.VcB('Bub', {
                Pg: Pg,
                xI: xI,
                JL: ud
            });
        }
    } else {
        if (Pq != an) {
            return;
        }
        gS();
        var pq = Ra.Rhp("onServerError", 'Oc', {
            Pg: Pg,
            xI: xI
        });
        if (!pq && gA.onServerError) {
            try {
                gA.onServerError(Pg, xI);
            } catch (Wq) {
                rv.Ek(Wq, gA.onServerError, "onServerError");
            }
        }
        rv.log("LS_l", 4);
        Gc.wh(true);
    }
    rv.log("LS_l", 5);
}

function LS_w(Pg, Pq, ud, EB, vH) {
    rv.QA("LS_w", arguments);
    uX.QA("LS_w", arguments);
    if (Lightstreamer.Yg) {
        rv.log("LS_w", 1);
        return true;
    }
    if (Pg == 4) {
        gS();
        var iO = ud;
        IA.Asb(iO, Pq);
    } else if (Pg == 5) {
        gS();
        var iO = ud;
        IA.hvP(iO, Pq);
    } else {
        if (hc(Pq)) {
            return;
        }
        gS();
        if (Pg == 8) {
            Ra.nLG(ud);
        } else if (Pg == 6) {}
        var NJ = Ra.QVi(ud);
        if (!NJ) {
            rv.log("LS_w", 1);
            return;
        }
        NJ.VcB('iOw', {
            Pg: Pg,
            JL: ud
        });
        rv.log("LS_w", 0);
    }
}
var EM = false;
var kg = 0;

function ND(Pq) {
    uX.QA('ND', arguments);
    if (Pq != an) {
        return;
    }
    if (pd != cT) {
        return;
    }
    if (EM) {
        uX.log('ND', 9);
        gS();
        EM = false;
        ZC(an, gA.policy.xf);
    } else {
        if (kg == 0) {
            kg++;
            uX.log('ND', 1);
            ZC(Pq, gA.policy.vl);
        } else if (kg == 1) {
            kg++;
            uX.log('ND', 2);
            gN();
            ZC(Pq, gA.policy.Bj);
        } else if (kg >= 2) {
            uX.log('ND', 3);
            Gc.NF("stalled");
        }
    }
}

function ZC(UJ, Rk) {
    Lightstreamer.FD.fx(ND, Rk, null, [UJ]);
}

function gS() {
    EM = true;
    if (kg >= 2) {
        kg = 0;
        gN();
    } else {
        kg = 0;
    }
}
var rl = location.hostname;
var LI = null;
var tG = "";

function kp() {
    var VS = "";
    if (gA.policy.PK > 0) {
        if (ag == null) {} else if (ag < 0) {
            return VS;
        } else if (ag == 0) {} else if (ag <= gA.policy.PK) {} else {}
        VS += "LS_requested_max_bandwidth=" + gA.policy.PK + "&";
    }
    return VS;
}

function Lt(Eu, Ua, sp, fM, Ci) {
    var iQ = (Lightstreamer.YX != null && Lightstreamer.YX != "") ? "LS_domain=" + Lightstreamer.YX + "&" : "";
    var WG = "LS_phase=" + an + "&" + kp() + iQ + (sp ? "LS_cause=" + sp + "&" : "");
    if (Eu) {
        WG += "LS_polling=true&";
        var rI = 0;
        var Qm = 0;
        if (fM != Yr) {
            rI = gA.policy.tm;
            if (Ci != null) {
                rI += Ci;
            }
            Qm = gA.policy.IQ;
        }
        WG += "LS_polling_millis=" + rI + "&";
        WG += "LS_idle_millis=" + Qm + "&";
    } else if (!isNaN(gA.policy.Fl)) {
        WG += "LS_keepalive_millis=" + gA.policy.Fl + "&";
    }
    if (pd == qL) {
        uX.log('Lt', 1);
        uX.kw(Tg != null, 'Lt');
        var TU = "LS_session=" + Tg + "&";
        return TU + WG;
    } else {
        uX.log('Lt', 2);
        var TO = "";
        if (gA.connection.Aj != null) {
            TO += ("LS_adapter_set=" + Lightstreamer.dj(gA.connection.Aj) + "&");
        }
        if (gA.connection.mH != null) {
            TO += ("LS_user=" + Lightstreamer.dj(gA.connection.mH) + "&");
        }
        if (gA.connection.PG != null) {
            TO += ("LS_password=" + Lightstreamer.dj(gA.connection.PG) + "&");
        }
        var DK = WG + tG + TO;
        if (Ua) {
            DK += ("LS_old_session=" + Ua + "&");
        }
        return DK;
    }
}

function fq(Eu, xt) {
    var mv = "";
    if (Eu || xt == "js") {
        if (pd == qL) {
            mv = gA.connection.KS + "/bind_session." + xt;
        } else {
            mv = gA.connection.KS + "/create_session." + xt;
        }
    } else {
        mv = gA.connection.KS + "/" + gA.connection.Si;
    }
    return AX() + mv;
}

function AX(If) {
    var vD = location.protocol + "//";
    var dK = "";
    if (!Lightstreamer.Ma(gA.connection.Kb, location.protocol)) {
        dK = ":" + gA.connection.Kb;
    }
    var vA = "";
    if (If) {
        vA = If;
    } else if (pd == qL || pd == cT) {
        vA = rl;
    } else {
        vA = gA.connection.dE;
    }
    return vD + vA + dK;
}(function(ls) {
    ls.wE = function() {
        this.BF = ls.kZ.getLogger("SH");
        this.EC = [Js, Ub];
        this.NE = this.EC;
        if (aU.ZU()) {
            this.Bl = [aU, Ub];
        } else {
            this.Bl = [Ub, aU];
        }
        this.jC = {};
        this.xG;
        this.RW;
        this.iH;
        this.gW = false;
        this.fM = Yr;
        this.Nq = Yr;
        this.ek = false;
        this.Tq = 0;
        this.Ip = 1;
        this.DS = 0;
        this.Ld = 2;
        this.Pt = 0;
        this.YU = 2;
        this.ww = null;
        this.iE;
        this.Tl = null;
        this.lK = new ls.td(this);
        this.uV = new ls.Ae();
    };
    ls.wE.prototype = {
        toString: function() {
            return ["[", 'wE', this.fM, this.gW, this.ww, this.xG, this.iH, this.RW].join("|");
        },
        NF: function(sp, UI, vY) {
            if (!gA || pd == CM || !this.uV.OYe()) {
                wd();
                this.BF.log('NF', 1, pd);
                return;
            }
            this.lK.qdq();
            if (vY && UI == eU) {
                this.lK.Rr();
            }
            this.BF.log('NF', 2, this, arguments);
            var Ua = Tg;
            if (this.ww) {
                this.wh();
            }
            if (vY) {
                this.uV.Kj();
            }
            this.DV();
            if (UI) {
                this.fM = UI;
            }
            this.Nq = this.fM;
            this.Tq = 0;
            this.DS = 0;
            this.Ld = 2;
            this.Ip = 1;
            if (pd == FF) {
                gN();
            } else {
                AF(FF);
            }
            wd();
            this.El(an, Ua, sp);
        },
        El: function(Pq, Ua, sp) {
            if (Pq != an) {
                this.BF.log('El', 1, Pq, an);
                return;
            }
            this.BF.kw(pd != cT, 'El');
            if (ls.TA()) {
                this.BF.log('El', 3);
                ls.FD.fx(this.El, 50, this, [Pq, Ua, "offline"]);
                return;
            }
            var wM = this.ANs('xG', this.EC, gA.policy.Nx, true, Ua, this.El, sp);
            this.BF.log('El', 2, wM, this);
            if (wM === null) {
                return;
            } else if (wM) {
                this.uV.QOq();
                BM = ls.gQ();
                var BO = this.SeD(true);
                ls.FD.fx(this.EFs, BO, this, [an, BO]);
            } else if (wM === false) {
                this.BF.kw(false, 'El');
            }
        },
        WeO: function(pZ) {
            this.jC = {
                xG: true,
                RW: true,
                iH: true
            };
        },
        ANs: function(hW, aF, jl, Eu, Ua, bg, sp) {
            var hQ = Lt(Eu, Ua, sp, this.fM, this.lK.tnR());
            var GN = 0;
            var wM = false;
            while (GN < aF.length && wM === false) {
                if (!this[hW] || this.jC[hW]) {
                    this[hW] = new aF[GN](this.fM == eU ? "LS_POLLFRAME" : "LS_PUSHFRAME");
                    this.jC[hW] = false;
                    GN++;
                }
                var tD = this[hW].cZ === Ub && jl ? xR : xr;
                var bJ;
                var VQ;
                if (this[hW].cZ === Js || this[hW].cZ === aU) {
                    bJ = nU;
                    VQ = AL;
                }
                this.ww = this[hW];
                var IG = fq(Eu, this.ww.MXn());
                wM = this.ww.IH(new bc(IG, hQ, tD), an, bJ, VQ);
                if (wM === null) {
                    ls.FD.fx(bg, 50, this, [an, Ua, sp]);
                    return null;
                } else if (wM === false) {
                    this[hW] = null;
                } else {
                    this.ek = true;
                }
            }
            return wM;
        },
        je: function(Pq, Db) {
            if (Pq != an || !this.uV.OYe()) {
                this.BF.log('je', 1, Pq, an);
                return;
            }
            this.fM = this.Nq;
            wd();
            if (this.fM == Yr) {
                this.Tl = ls.gQ();
            }
            var aF = this.fM == Yr ? this.Bl : this.NE;
            var hW = this.fM == Yr ? 'iH' : 'RW';
            var wM = this.ANs(hW, aF, true, this.fM == eU, null, this.je, Db);
            this.BF.log('je', 2, Tg, wM, this);
            if (wM === null) {
                return;
            } else if (wM) {
                if (this.fM == Yr) {
                    On = this.ww.cZ === Ub;
                    var BO = this.tgr();
                    ls.FD.fx(this.EFs, BO, this, [an, BO]);
                } else {
                    BM = ls.gQ();
                    var BO = this.SeD(false);
                    ls.FD.fx(this.EFs, BO, this, [an, BO]);
                }
            } else {
                this.BF.kw(false, 'El');
            }
        },
        RnT: function(Pq, Ci) {
            if (Pq != an) {
                this.BF.log('RnT', 1);
                return;
            }
            this.BF.log('RnT', 2);
            this.lK.rBH(Ci);
            this.je(Pq);
        },
        DV: function() {
            rl = gA.connection.dE;
            gA.policy.Vh('xf', NaN);
            gA.policy.Vh('OR', NaN);
            ag = null;
            Tg = null;
            kg = 0;
            Ns.IH(false, true);
            this.BF.log('DV');
        },
        wh: function(SL) {
            if (!gA || !this.ww || pd == Jk) {
                wd();
                this.BF.log('wh', 1);
                return;
            }
            this.BF.log('wh', 2, this.ww);
            this.ww.mb();
            so.CU(AX(rl));
            wd();
            AF(Jk);
            this.NX();
            Ra.VJ();
            if (Tg != null && !SL) {
                this.BF.log('wh', 3);
                this.aJ();
            }
            this.ww = null;
            rl = null;
            Tg = null;
        },
        Ru: function(UI, Db) {
            this.Nq = UI;
            if (UI == Yr) {
                this.Ld = this.DS + 1;
            }
            if (this.GpO()) {
                if (UI == eU) {
                    this.Ip = this.Tq + 1;
                    this.Ld = -1;
                }
                this.Yi(Db);
                ls.FD.fx(this.huJ, this.getSwitchCheckTimeout(), this, [an, UI]);
            } else {
                this.je(an, Db);
            }
        },
        pcT: function() {
            return pd == cT || pd == qL;
        },
        GpO: function() {
            return this.pcT() && this.ek;
        },
        NX: function() {
            kC.RO();
            IA.mb();
        },
        Gr: function() {
            this.BF.log('Gr', this);
            this.NX();
            Ra.Gr();
            this.eV();
        },
        eV: function() {
            this.BF.log('eV', this);
            this.DS++;
            if (this.fM == Yr && this.Nq == Yr) {
                if (On) {
                    ls.FD.fx(nk, 900);
                }
                if (this.DS >= this.Ld) {
                    ZC(an, gA.policy.xf);
                    var UE = this.iaM();
                    this.iE = (UE > gA.policy.Ow ? gA.policy.Ow : UE) + gA.policy.Ow;
                }
            }
            AF(cT);
        },
        bae: function(PU) {
            this.BF.QA('bae');
            this.BF.kw(pd == cT, 'bae');
            if (pd != cT) {
                return;
            }
            this.Tq++;
            if (this.fM == eU) {
                gA.policy.OR = PU;
                if (PU > gA.policy.tm) {
                    gA.policy.Vh('OR', gA.policy.tm);
                } else {
                    gA.policy.Vh('OR', PU);
                }
            }
            wd();
            AF(qL);
            this.ek = false;
            if (this.Nq == eU) {
                if (this.Tq == this.Ip) {
                    var tm = gA.policy.tm > gA.policy.ii ? gA.policy.ii : gA.policy.tm;
                    ls.FD.fx(this.je, tm, this, [an]);
                } else {
                    var lb = EK();
                    ls.FD.fx(this.RnT, lb, this, [an, lb]);
                }
            } else {
                this.je(an);
            }
        },
        APa: function() {
            this.BF.log('APa');
            if (!this.gW && this.fM == Yr && this.Nq == Yr && this.DS >= this.Ld) {
                this.gW = true;
            }
        },
        aJ: function() {
            this.BF.log('aJ', Tg, this);
            var Ul = rl ? rl : gA.connection.dE;
            Ul = AX(Ul);
            var QD = "LS_op=destroy&LS_session=" + Tg + "&";
            kC.TtA(Tg, QD, sM.tJ, null, Ul);
        },
        Yi: function(PP) {
            this.BF.log('Yi', Tg, this);
            var QD = "LS_op=force_rebind&";
            if (PP) {
                QD += "LS_cause=" + PP + "&";
            }
            var lP = this.lK.tnR();
            if (lP != null) {
                QD += "LS_polling_millis=" + lP + "&";
            }
            var lJ = new ls.pO(an, PP);
            kC.TtA(Tg, QD, sM.Nh, lJ);
        },
        huJ: function(Pq, UI) {
            this.BF.QA('huJ', Pq);
            if (Pq == an) {
                this.NF("forceRebindFailed", UI);
            }
        },
        EFs: function(Pq, sk) {
            this.BF.QA('EFs', Pq);
            if (Pq != an) {
                return;
            }
            if (pd != cT) {
                Oe++;
                if (Oe >= 2) {
                    so.Jds(AX());
                }
                var NP = "timeout";
                var cC = "sense";
                if (this.fM == Yr) {
                    if (this.DS == 0) {
                        this.NF(NP);
                    } else if (this.gW) {
                        this.Pt++;
                        var SH = NP + ".hs." + this.Pt;
                        if (this.Pt >= this.YU) {
                            this.gW = false;
                            this.Pt = 0;
                        }
                        this.NF(SH);
                    } else {
                        this.Ru(eU, cC);
                    }
                } else if (this.fM == eU) {
                    if (!ki && !this.lK.rco(sk)) {
                        this.NF(cC, Yr);
                    } else {
                        this.NF(NP + ".poll");
                    }
                }
            }
        },
        getSwitchCheckTimeout: function() {
            return gA.policy.sc + (this.lK.tnR() || 0);
        },
        iaM: function() {
            if (!this.Tl) {
                return 0;
            }
            var cP = ls.gQ();
            return cP - this.Tl;
        },
        SeD: function(Mp) {
            var gH;
            if (this.fM == Yr) {
                gH = this.tgr();
            } else {
                if (!Mp) {
                    gH = gA.policy.Ow + gA.policy.IQ;
                } else {
                    gH = gA.policy.Ow;
                }
            }
            uX.log('SeD', gH);
            return gH;
        },
        tgr: function() {
            return this.gW ? this.iE : gA.policy.Ow;
        }
    };
})(Lightstreamer);
var BM = null;

function EK() {
    var ur = gA.policy.tm;
    if (BM) {
        var cP = Lightstreamer.gQ();
        var LJ = cP - BM;
        if (ur > LJ) {
            ur -= LJ;
        } else {
            ur = 1;
        }
    }
    if (!isNaN(gA.policy.OR)) {
        if (gA.policy.OR < ur) {
            ur = gA.policy.OR;
        }
    }
    return ur;
}
var Oe = 0;
(function(ls) {
    ls.Ae = function() {
        this.BF = ls.kZ.getLogger("MT");
        this.Kj();
    };
    ls.Ae.prototype = {
        Kj: function() {
            this.LE = ls.ms(1.5, true) ? 10 : 50;
            this.Me = 0;
            this.bx = 0;
            this.ae = 0;
            this.DD = null;
            this.Wb = null;
            this.JB = null;
        },
        QOq: function() {
            this.DD = this.Me;
            this.Wb = this.bx;
            this.JB = this.ae;
            var Bd = ls.gQ();
            if (!this.ae) {
                this.ae = Bd;
            }
            if ((Bd - this.ae) >= 60000) {
                this.Me = 0;
                this.ae = Bd;
            }
            if (this.bx && (Bd - this.bx) < 1000) {
                this.Me++;
            }
            this.bx = Bd;
        },
        Gfs: function() {
            if (this.Wb != this.bx) {
                this.Me = this.DD;
                this.bx = this.Wb;
                this.ae = this.JB;
            }
        },
        OYe: function() {
            if (this.bx == 0) {
                return true;
            } else if (!this.LE) {
                return false;
            } else if (this.Me >= this.LE) {
                var lS = "It has been detected that the JavaScript engine of this browser is not respecting the timeouts in setTimeout method calls. The Client has been disconnected from the Server in order to avoid reconnection loops. To try again, just refresh the page.";
                this.BF.aG(lS, "changeStatus");
                ls.kZ.Qk(gA, 110, lS);
                this.LE = 0;
                return false;
            }
            return true;
        }
    };
})(Lightstreamer);
(function(ls) {
    ls.MI = function() {
        this.Sj = false;
        this.cN = {};
    };
    ls.MI.prototype = {
        Jds: function(eX) {
            if (!Lightstreamer.pW) {
                return;
            }
            if (this.Sj) {
                return;
            }
            var cS = ls.EJ + eX;
            var ja = ls.QX(cS);
            if (!ja) {
                return;
            }
            uK.log('Jds', eX, ja);
            for (var GN = 0; GN < ja.length; GN++) {
                if (ja[GN] == gA.eJ + "_" + gA.getApplicationName()) {
                    continue;
                }
                var Np = ls.EJ + ja[GN];
                var mY = ls.QX(Np);
                if (!mY) {
                    continue;
                }
                var LJ = ls.gQ() - Number(mY[0]);
                if (LJ > ls.tu) {
                    continue;
                } else {
                    var GR = "Warning: there is probably another web application connected to the same Lightstreamer Server within this browser instance. That could prevent the current application from connecting to the Server. Please close the other application to unblock the current one.";
                    uK.aG(GR, "changeStatus");
                    this.Sj = true;
                    ls.kZ.Qk(gA, 120, GR);
                    return;
                }
            }
        },
        wDH: function(pB) {
            if (!ls.pW) {
                return;
            }
            if (typeof pB == "undefined") {
                pB = AX();
            }
            var cS = ls.EJ + pB;
            ls.aV(cS, gA.eJ + "_" + gA.getApplicationName());
            this.cN[pB] = true;
        },
        CU: function(pB) {
            if (!ls.pW) {
                return;
            }
            if (typeof pB == "undefined") {
                for (var vQ in this.cN) {
                    this.CU(vQ);
                }
            } else if (this.cN[pB]) {
                var cS = ls.EJ + pB;
                ls.Fb(cS, gA.eJ + "_" + gA.getApplicationName());
                uK.log('CU', pB);
                delete(this.cN[pB]);
            }
        }
    }
})(Lightstreamer);
var xR = 1;
var xr = 2;

function bc(CI, QD, tD) {
    this.ho = CI;
    this.QD = QD ? QD : "";
    this.tD = tD ? tD : xr;
}
bc.prototype = {
    toString: function() {
        return ["[", this.ho, this.QD, this.tD == xr ? "POST" : "GET", "]"].join("|");
    },
    dOV: function() {
        return new bc(this.ho, this.QD, this.tD);
    }
};
Lightstreamer.fO = new bc("lsblank.html", null, "GET");
(function(ls) {
    ls.Jc = function() {
        this.XP = 0;
        this.tE = {};
        this.tE.length = 0;
        this.xc = null;
        this.BF = ls.kZ.getLogger("FF");
    };
    ls.Jc.prototype = {
        iTi: function(jb, ct, tD, Rw) {
            if (!this.DUa()) {
                this.BF.log('iTi', 1);
                return null;
            }
            try {
                var GX = ls.GE.hpL("LS_FORMFRAME").document.LS_form;
                var vE = GX.target;
                var fT = GX.method;
                if (Rw) {
                    GX.target = Rw;
                }
                if (tD) {
                    GX.method = tD;
                }
                if (!this.Dee(jb, ct)) {
                    this.BF.log('iTi', 4);
                    this.pw();
                    return null;
                }
                GX.method = fT;
                GX.target = vE;
            } catch (Wq) {
                this.BF.CP(Wq, 'iTi');
                this.pw();
                return null;
            }
            this.BF.log('iTi', 3);
            this.pw();
            return true;
        },
        Dee: function(nO, ec) {
            this.BF.log('Dee', ec);
            try {
                var hb = ls.GE.hpL("LS_FORMFRAME").document;
                hb.LS_form.action = nO;
                if (ls.tj() && hb.LS_form.target == "LS_CONTROLFRAME") {
                    if (ls.tj(9, false)) {
                        var Ob = ls.GE.hpL("LS_CONTROLFRAME").document.getElementsByTagName("BODY")[0];
                        if (!(Ob == null || typeof Ob == "undefined")) {
                            var lv = this.XP;
                            if (this.tE.length > 0) {
                                lv = this.tE[this.tE.length - 1];
                                this.tE.length--;
                            } else {
                                this.XP++;
                            }
                            var co = "LS_FORMTARGET" + lv;
                            var nK = document.createElement("iframe");
                            nK.name = co;
                            Ob.appendChild(nK);
                            hb.LS_form.target = co;
                            this.QP(lv);
                        }
                    }
                }
                var ve = hb.getElementById("LS_querystring");
                ve.setAttribute("value", ec);
                ve.value = ec;
                var vn = hb.getElementById("LS_form");
                vn.submit();
            } catch (Wq) {
                this.BF.CP(Wq, 'Dee');
                return false;
            }
            return true;
        },
        pw: function(cP) {
            if (cP) {
                this.xc = true;
            } else {
                ls.FD.fx(this.pw, 1000, this, [true]);
            }
        },
        QP: function(lv) {
            ls.FD.fx(this.KbT, 3000, this, [lv]);
        },
        KbT: function(lv) {
            this.tE[this.tE.length] = lv;
            this.tE.length++;
        },
        DUa: function() {
            if (this.xc === null) {
                this.Gw(null, true);
            }
            this.BF.log('DUa', this.xc);
            if (this.xc) {
                this.xc = false;
                return true;
            } else {
                return false;
            }
        },
        Gw: function(Ci, jK) {
            if (this.xc !== null) {
                return;
            }
            this.BF.log('Gw', Ci);
            if (!jK) {
                if (!Ci) {
                    Ci = 50;
                } else {
                    Ci *= 2;
                }
                this.BF.log('Gw', 1);
                ls.FD.fx(this.Gw, Ci, this, [Ci]);
            }
            try {
                var tp = ls.GE.hpL("LS_FORMFRAME");
                if (tp && tp.document && tp.document.LS_form) {
                    this.pw(true);
                    this.BF.log('Gw', 2);
                    if (kC) {
                        kC.WeO(Ve);
                    }
                }
            } catch (Wq) {
                this.BF.CP(Wq, 'Gw');
            }
        }
    };
})(Lightstreamer);

function fF() {
    this.BF = Lightstreamer.kZ.getLogger("SC");
}
fF.ZU = function() {
    return true;
};
fF.prototype = {
    mb: function() {
        return;
    },
    IH: function(Bc, Pq, Gf, HD, hs) {
        return false;
    },
    dnr: function(Bc) {
        return 0;
    },
    htQ: function() {
        return 0;
    },
    MXn: function() {
        return "html";
    }
};

function Pj() {
    this.uW(Pj);
}
Pj.DW = function() {
    return false;
};
Pj.prototype = {
    IH: function(Bc, Pq, Gf, HD) {
        if (Gf) {
            this.Wh(Gf, Pq);
        }
        return false;
    },
    Wh: function(Gf, Pq) {
        Lightstreamer.FD.fx(Gf, 1000, null, [null, Pq]);
    }
};
Lightstreamer.Ou(Pj, fF);

function Ve(Rw) {
    this.uW(Ve);
    if (Rw) {
        this.target = Rw;
    }
    this.cZ = Ve;
}
Ve.ZU = function() {
    return true;
};
Ve.prototype = {
    toString: function() {
        return ["[", 'Ve', this.target, "]"].join("|");
    },
    IH: function(Bc, Pq, Gf, HD) {
        this.AE(Ve, 'IH', Bc, Pq, Gf, HD);
        var VS = Gn.iTi(Bc.ho, Bc.QD, Bc.tD == xr ? "POST" : "GET", this.target);
        return VS;
    },
    dnr: function(Bc) {
        if (Bc && Bc.Bc) {
            return 6 + Lightstreamer.dj(Bc.Bc).length - Bc.Bc.length;
        } else {
            return 0;
        }
    },
    htQ: function() {
        return 15;
    }
};
Lightstreamer.Ou(Ve, Pj);

function Ub(target) {
    this.uW(Ub);
    this.target = target;
    this.YE = 0;
    this.isOpen = false;
    this.Uc = null;
    this.cZ = Ub;
}
Ub.ZU = function() {
    return true;
};
Ub.prototype = {
    toString: function() {
        return ["[", 'Ub', this.isOpen, this.target, this.YE, this.Uc, "]"].join("|");
    },
    MsH: function(uQ) {
        if (uQ != this.YE) {
            return;
        }
        this.YE++;
        if (this.isOpen) {
            this.Bm(this.YE, Lightstreamer.fO);
            this.isOpen = false;
        }
    },
    mb: function() {
        var uQ = ++this.YE;
        Lightstreamer.FD.fx(this.MsH, 0, this, [uQ]);
    },
    Bm: function(uQ, Bc, Pq, Gf, HD) {
        if (uQ != this.YE || Lightstreamer.rN) {
            return;
        }
        this.AE(Ub, 'IH', Bc, Pq, Gf, HD);
        this.YE++;
        this.BF.log('IH', Bc, Pq);
        try {
            var IV = Lightstreamer.GE.hpL(this.target);
            var CI = Bc.ho;
            if (Bc.QD) {
                CI += "?" + Bc.QD;
            }
            IV.location.replace(CI);
            this.isOpen = true;
        } catch (Wq) {
            this.BF.CP(Wq, 'IH');
            return false;
        }
        return true;
    },
    ugv: function(Bc, Pq, Gf, HD) {
        if (!this.Uc) {
            this.Uc = new Ve(this.target);
        }
        this.YE++;
        var VS = this.Uc.IH(Bc, Pq, Gf, HD);
        if (VS) {
            this.isOpen = true;
        }
        return VS;
    },
    IH: function(Bc, Pq, Gf, HD) {
        if (Bc.method == xr) {
            return this.ugv(Bc, Pq, Gf, HD);
        }
        var uQ = ++this.YE;
        Lightstreamer.FD.fx(this.Bm, 0, this, [uQ, Bc, Pq, Gf, HD]);
        return true;
    },
    dnr: function(Bc) {
        return 2;
    }
};
Lightstreamer.Ou(Ub, Pj);

function Js() {
    this.uW(Js);
    this.pa = null;
    this.sender = null;
    this.Tt = null;
    this.xw = null;
    this.error = null;
    this.isOpen = false;
    this.Pq = 0;
    this.LS_x = Lightstreamer.getClosureForNoParams(this.buZ, this);
    this.cZ = Js;
}
Js.ZU = function() {
    return !Ns.isDisabled();
};
Js.prototype = {
    toString: function() {
        return ["[", 'Js', this.isOpen, this.Pq, this.pa, "]"].join("|");
    },
    IH: function(Bc, Pq, Gf, HD) {
        if (Ns.isDisabled()) {
            return false;
        } else if (!Ns.iaU()) {
            return null;
        } else if (this.isOpen) {
            return null;
        }
        this.pa = Pq;
        this.Tt = null;
        this.xw = Gf;
        this.error = HD;
        this.Pq++;
        this.LS_h = Lightstreamer.getClosureFor(this.ZqJ, this)(this.Pq);
        this.isOpen = true;
        this.BF.log('IH', 1, this, Bc);
        return Ns.fhp(Bc.ho, Bc.QD, this);
    },
    mb: function() {
        if (!this.isOpen) {
            return;
        }
        this.vc();
        try {
            if (this.sender && this.sender.abort) {
                this.sender.abort();
            }
        } catch (hL) {}
        this.Qu();
        this.BF.log('mb', 1, this);
    },
    iqs: function() {
        try {
            if (this.Tt === null) {
                this.Tt = this.sender.status >= 200 && this.sender.status <= 299;
            }
            return this.Tt;
        } catch (Wq) {
            this.BF.CP(Wq, 'ZqJ', 1);
            return false;
        }
    },
    ZqJ: function(uQ) {
        if (Lightstreamer.Yg || uQ != this.Pq || !this.sender) {
            return;
        }
        if (this.sender.readyState == 4 || this.sender.readyState == "complete") {
            var QD = null;
            if (this.iqs()) {
                QD = this.sender.responseText;
                QD = QD.toString();
                if (QD.substring(0, 2) == "/*") {
                    QD = QD.substring(2, QD.length - 2);
                }
            }
            this.BF.log('ZqJ', 1, this);
            this.vc();
            if (this.xw) {
                this.xw(QD, this.pa);
            }
            this.Qu();
        }
    },
    buZ: function(MU) {
        if (Lightstreamer.Yg) {
            return;
        }
        Ns.oV();
        this.vc();
        if (this.error) {
            this.error(MU, this.pa);
        }
        this.Qu();
    },
    Qu: function() {
        try {
            delete this.sender.onreadystatechange;
        } catch (Wq) {
            this.BF.log('Qu', 1);
        }
        try {
            delete this.sender;
        } catch (Wq) {
            this.BF.log('Qu', 2);
        }
        delete this.error;
        delete this.xw;
    },
    vc: function() {
        this.BF.log('vc');
        this.isOpen = false;
        this.Pq++;
    },
    dnr: function(Bc) {
        return 2;
    },
    MXn: function() {
        return "js";
    }
};
Lightstreamer.Ou(Js, fF);

function aU() {
    this.uW(aU);
    this.Ut = 0;
    this.kI = false;
    this.cZ = aU;
}
aU.Yl = null;
aU.ZU = function() {
    if (Ns.isDisabled()) {
        return false;
    }
    if (aU.Yl !== null) {
        return aU.Yl;
    }
    if (Lightstreamer.ZK()) {
        aU.Yl = false;
    } else if (typeof(XMLHttpRequest) != "undefined") {
        aU.Yl = typeof(new XMLHttpRequest().addEventListener) != "undefined";
    } else {
        aU.Yl = false;
    }
    return aU.Yl;
};
aU.prototype = {
    toString: function() {
        return ["[", 'aU', this.isOpen, this.Ut, this.Pq, this.pa, "]"].join("|");
    },
    IH: function(Bc, Pq, Gf, HD) {
        var lg = this.AE(aU, 'IH', Bc, Pq, Gf, HD);
        if (lg) {
            this.Ut = 0;
            this.kI = false;
            this.JA = false;
        }
        return lg;
    },
    isPreambleFinished: function() {
        if (this.kI) {
            return true;
        }
        var wU = this.sender.responseText.indexOf("setPhase(");
        var Jw = this.sender.responseText.indexOf("setPhase(ph)");
        if (wU > -1) {
            if (Jw <= -1) {
                this.kI = true;
                return true;
            }
            var pR = this.sender.responseText.indexOf("setPhase(", wU + 1);
            if (pR > -1) {
                this.kI = true;
                return true;
            } else {
                return false;
            }
        }
    },
    ZqJ: function(uQ) {
        if (Lightstreamer.Yg || uQ != this.Pq || !this.sender) {
            return;
        }
        var Vc;
        if (this.xw && (this.sender.readyState == 3 || this.sender.readyState == 4)) {
            if (this.Ut > 0 || this.iqs()) {
                if (!this.isPreambleFinished()) {
                    return;
                }
                var bO = this.sender.readyState == 4 && !this.JA ? this.sender.responseText.length : this.sender.responseText.lastIndexOf(";\n") + 2;
                Vc = this.sender.responseText.substring(this.Ut, bO);
                if (this.Ut == 0 && Vc.substring(0, 2) == "/*") {
                    Vc = Vc.substring(2, Vc.length);
                    this.JA = true;
                }
                this.Ut = bO;
                this.BF.log('ZqJ', 1, this);
                this.xw(Vc, this.pa);
            }
        }
        if (this.sender.readyState == 4) {
            if (!this.iqs()) {
                this.xw(null, this.pa);
            }
            this.BF.log('ZqJ', 2);
            this.vc();
            this.Qu();
            if (Vc == "") {
                Lightstreamer.FD.fx(eZ, 100, null, [this.pa]);
            }
        }
    }
};
Lightstreamer.Ou(aU, Js);
(function(ls) {
    ls.Hj = function() {
        this.gk = [Js, Ve];
        this.BF = ls.kZ.getLogger("RR");
        this.eD = null;
        this.VZ = null;
        this.LR = null;
        this.di = null;
        this.Xo = 0;
        this.Ux = 1;
        this.dD = false;
        this.Pq = this.Ux;
        this.Lh = 0;
        this.Sm = null;
        this.rQ = 0;
        this.AR = null;
        this.Ai();
        this.RO();
    };
    ls.Hj.prototype = {
        toString: function() {
            return ["[", 'Hj', this.dD, this.Sm, this.Xo, this.AR, "]"].join("|");
        },
        Ai: function() {
            for (var GN = 0; GN < this.gk.length; GN++) {
                if (this.gk[GN].ZU()) {
                    this.AR = new this.gk[GN]();
                    return;
                }
            }
            if (this.AR == null) {
                this.BF.kw(false, 'Ai');
                throw ('Hj');
            }
        },
        WeO: function(pZ) {
            var II = -1;
            var kA = -1;
            for (var GN = 0; GN < this.gk.length; GN++) {
                if (this.AR.cZ == this.gk[GN]) {
                    II = GN;
                    this.BF.log('WeO', 1, II);
                }
                if (pZ == this.gk[GN]) {
                    kA = GN;
                    this.BF.log('WeO', 2, kA);
                }
                if (kA > -1 && II > -1) {
                    if (kA < II) {
                        this.AR = new pZ();
                    }
                    return;
                }
            }
        },
        MuK: function(PD) {
            this.BF.log('MuK', PD);
            this.Xo = PD;
        },
        mb: function() {
            this.BF.log('mb');
            if (this.AR) {
                this.AR.mb();
            }
        },
        RO: function() {
            this.BF.log('RO');
            this.Xo = 0;
            this.eD = new aS(sM.To);
            this.VZ = new aS(sM.jq);
            if (!this.LR) {
                this.LR = new aS(sM.ha);
            }
            if (!this.di) {
                this.di = new aS(sM.jq);
            }
            this.TZ = [{
                q: this.eD,
                vT: sM.To
            }, {
                q: this.VZ,
                vT: sM.jq
            }, {
                q: this.LR,
                vT: sM.ha
            }, {
                q: this.di,
                vT: sM.jq
            }];
            this.Pq++;
            var Eo = this.Sm && this.Sm.po() ? this.Sm.po().Eo : null;
            if (Eo !== null && Eo !== sM.tJ && Eo !== sM.ha) {
                this.mb();
                this.dD = false;
                this.Sm = null;
                this.Ux++;
                this.ot(false);
            } else if (Eo === null) {
                this.BF.kw(!this.dD && this.Sm == null, 'RO', this);
                this.ot(false);
            }
        },
        TtA: function(eb, Bc, Eo, cv, dv) {
            ls.FD.fx(this.qjW, 0, this, [this.Pq, eb, Bc, Eo, cv, dv]);
        },
        wO: function(Zg, Eo) {
            if (Eo == sM.tJ || Eo == sM.ha) {
                return true;
            } else {
                return this.Pq === Zg;
            }
        },
        qjW: function(uQ, eb, Bc, Eo, cv, dv) {
            if (!this.wO(uQ, Eo)) {
                return;
            }
            this.BF.log('qjW', 1, eb, Bc);
            var tf = "";
            if (Eo != sM.tJ) {
                if (Tg) {
                    tf = "LS_session=" + Tg + "&";
                } else if (Eo != sM.ha) {
                    this.BF.kw(false, 'qjW');
                }
            }
            Bc = tf + Bc + "LS_unique=" + (++this.rQ) + "&";
            if (this.Xo > 0 && Bc.length > this.Xo) {
                this.BF.aG("A subscription req" + "uest(" + Bc + ") size exceeds the <request_limit> configuration setting for the Server(" + this.Xo + ")");
            }
            var fn = new sM(Bc, cv, Eo, eb, dv);
            if (Eo == sM.To) {
                this.eD.TtA(fn);
            } else if (Eo == sM.ha) {
                this.LR.TtA(fn);
            } else if (Eo == sM.tJ) {
                this.di.TtA(fn);
            } else {
                this.VZ.TtA(fn);
            }
            this.ot(true);
        },
        ot: function(TS) {
            this.BF.log('ot', this.dD, TS);
            if (this.dD) {
                return;
            } else {
                this.dD = true;
                if (TS) {
                    this.AJ(this.Ux);
                } else {
                    this.KP();
                }
            }
        },
        KP: function(Ku) {
            if (Ku) {
                if (Ku != this.Ux) {
                    return;
                }
                this.Sm = null;
            }
            this.Ux++;
            this.BF.log('KP', this.Ux);
            ls.FD.fx(this.AJ, 0, this, [this.Ux]);
        },
        AJ: function(Ku) {
            if (Ku != this.Ux) {
                return;
            }
            this.Ux++;
            this.BF.log('AJ', this.Lh, this.Ux);
            var Re = 0;
            while (Re < this.TZ.length) {
                this.Lh = this.Lh < this.TZ.length - 1 ? this.Lh + 1 : 0;
                if (this.TZ[this.Lh].q.length > 0) {
                    this.RK(this.TZ[this.Lh].vT, this.TZ[this.Lh].q);
                    this.qg();
                    return;
                }
                Re++;
            }
            this.wQ();
        },
        qg: function(Ku) {
            if (Ku && Ku != this.Ux) {
                return;
            }
            if (!this.Sm || this.Sm.length <= 0) {
                return;
            }
            var Bc = this.Sm.lmi();
            if (!Bc) {
                this.wQ();
                return;
            }
            var BI = this.Sm.YK ? this.Sm.YK : AX();
            this.BF.log('qg', 1, Bc);
            var JI = false;
            var SK = false;
            var tM = 0;
            while (SK === false && tM <= this.gk.length) {
                Bc.ho = BI + this.IAv();
                this.AR.mb();
                SK = this.AR.IH(Bc, this.Ux, this.iNf(), this.MrH());
                if (SK === false) {
                    this.BF.log('qg', 2, this.AR.cZ);
                    try {
                        this.Ai();
                    } catch (Wq) {
                        this.BF.CP(Wq, 'qg');
                        this.io();
                        return;
                    }
                }
                tM++;
            }
            this.BF.log('qg', 3, SK);
            if (SK === null) {
                this.Ux++;
                ls.FD.fx(this.qg, 200, this, [this.Ux]);
            } else if (SK === false) {
                this.io();
            } else {
                this.rZ(this.Sm);
                this.kY();
            }
        },
        io: function() {
            this.rZ(this.Sm, true);
            this.dD = false;
        },
        wQ: function() {
            this.mb();
            this.dD = false;
            this.BF.log('wQ');
        },
        kY: function() {
            ls.FD.fx(this.KP, 4000, this, [this.Ux]);
        },
        iNf: function() {
            var Yt = this;
            return function(Nf, jk) {
                if (jk != Yt.Ux) {
                    return;
                }
                if (Nf != null) {}
                Yt.Sm = null;
                Yt.KP();
            };
        },
        MrH: function() {
            var Yt = this;
            return function(CA, jk) {
                if (jk != this.Ux) {
                    return;
                }
                Yt.BF.CP(CA, 'MrH');
                Yt.Sm = null;
                Yt.KP();
            };
        },
        RK: function(Ic, GJ) {
            this.BF.log('RK', Ic);
            this.Sm = new aS(Ic);
            var br = this.Xo == 0 ? 0 : this.AR.htQ();
            var Jh = true;
            while (GJ.length > 0 && Jh) {
                var po = GJ.po();
                if (po.dv && po.dv !== true) {
                    this.Sm.TtA(GJ.shift());
                    this.Sm.YK = po.dv;
                    Jh = false;
                } else if (this.Xo == 0) {
                    this.Sm.TtA(GJ.shift());
                } else if (this.Sm.length == 0 || (this.Sm.length + br + po.Bc.length) <= this.Xo) {
                    br += this.AR.dnr(po);
                    this.Sm.TtA(GJ.shift());
                } else {
                    Jh = false;
                }
            }
        },
        IAv: function() {
            var Eo = this.Sm.po().Eo;
            var KL = gA.connection.KS + "/";
            if (Eo == sM.To) {
                KL += "send_message.";
            } else if (Eo == sM.ha) {
                KL += "send_log.";
            } else {
                KL += "control.";
            }
            KL += this.AR.MXn();
            return KL;
        },
        rZ: function(sm, uZ) {
            var GN = 0;
            var Au = null;
            while (Au = sm.FXf(GN)) {
                if (Au.cv) {
                    Au.cv.Wh(uZ);
                }
                GN++;
            }
        }
    };
})(Lightstreamer);

function aS(aC) {
    this.length = 0;
    this.GJ = [];
    this.NO = {};
    this.BF = Lightstreamer.kZ.getLogger("RR");
    this.Ic = aC;
    this.fb = 0;
    this.YK = null;
}
aS.iM = "C";
aS.SC = "F";
aS.prototype = {
    mC: function(BG, Bc) {
        this.NO[BG] = this.GJ.length;
        this.GJ.push(Bc);
        this.length += Bc.Bc.length;
    },
    TtA: function(Bc) {
        if (Bc.Eo == sM.To || Bc.Eo == sM.ha) {
            if (this.Ic != Bc.Eo) {
                this.BF.kw(false, 'TtA', 3, Bc);
                return false;
            }
            this.mC(this.fb++, Bc);
            return true;
        }
        if (this.Ic != sM.jq) {
            this.BF.kw(false, 'TtA', 2, Bc);
            return false;
        }
        var BG;
        switch (Bc.Eo) {
            case sM.mN:
                BG = aS.iM;
                break;
            case sM.Nh:
                BG = aS.SC;
                break;
            default:
                BG = Bc.xS;
                break;
        }
        var pA = this.NO[BG];
        this.BF.log('TtA', 1, BG, pA, Bc);
        if ((pA || pA == 0) && !isNaN(pA)) {
            if (pA >= 0) {
                if (Bc.Eo == sM.mN || Bc.Eo == sM.Nh) {
                    this.BF.log('TtA', 2);
                    this.PW(pA, Bc);
                    return true;
                } else if (Bc.Eo == sM.kd) {
                    var SR = this.GJ[pA];
                    this.BF.log('TtA', 3, SR);
                    if (SR.dv) {
                        this.PW(pA, Bc);
                    } else if (SR.Eo == sM.kd) {} else {
                        this.tv(pA);
                    }
                    return true;
                } else if (Bc.Eo == sM.tJ) {
                    while ((pA || pA == 0) && !isNaN(pA) && pA >= 0) {
                        var SR = this.GJ[pA];
                        this.BF.log('TtA', 9, Bc, SR);
                        if (Bc.dv != SR.dv) {
                            BG += "_";
                            pA = this.NO[BG];
                        } else {
                            return true;
                        }
                    }
                } else {
                    this.BF.log('TtA', 4, BG);
                    this.PW(pA, Bc);
                    return true;
                }
            } else {
                this.BF.Ct('TtA', 7, pA);
            }
        }
        this.mC(BG, Bc);
        return true;
    },
    PW: function(Am, BJ) {
        if (this.GJ.length <= Am) {
            this.BF.Ct('PW', 1, Am, this.GJ.length);
            return;
        }
        this.BF.log('PW', 2, Am);
        var rs = BJ.Bc.length - this.GJ[Am].Bc.length;
        this.GJ[Am] = BJ;
        this.length += rs;
    },
    tv: function(Am) {
        if (this.GJ.length <= Am) {
            this.BF.Ct('tv', 1, Am, this.GJ.length);
            return null;
        }
        this.BF.log('tv', 2, Am);
        var JQ = this.GJ.length - Am;
        var VS = this.GJ.splice(Am, 1)[0];
        var bw = null;
        var kF = [];
        for (var GN in this.NO) {
            if (JQ <= 0) {
                break;
            } else if (this.NO[GN] > Am) {
                kF.push(GN);
                JQ--;
            } else if (this.NO[GN] == Am) {
                bw = GN;
                JQ--;
            }
        }
        if (bw != null) {
            delete(this.NO[bw]);
        } else {
            this.BF.Ct('tv', 1, Am, this.GJ.length);
        }
        for (var pA = 0; pA < kF.length; pA++) {
            this.NO[kF[pA]]--;
        }
        this.length -= VS.Bc.length;
        return VS;
    },
    shift: function() {
        return this.tv(0);
    },
    pop: function() {
        return this.tv(this.GJ.length - 1);
    },
    ci: function() {
        if (this.GJ.length <= 0) {
            return null;
        }
        return this.GJ[this.GJ.length - 1];
    },
    lmi: function(Ds) {
        if (this.GJ.length <= 0) {
            return null;
        }
        var Bc = new bc(Ds);
        var MP = null;
        for (var GN = this.GJ.length - 1; GN >= 0; GN--) {
            if (this.GJ[GN].Eo == sM.jq && this.GJ[GN].cv.eQE()) {
                this.tv(GN);
            } else if (this.GJ[GN].Eo == sM.kd && !this.GJ[GN].cv.ueF()) {
                Ra.nLG(this.GJ[GN].cv.BG);
                this.tv(GN);
            } else if (MP == null) {
                MP = this.GJ[GN].Bc;
            } else {
                MP += "\r\n" + this.GJ[GN].Bc;
            }
        }
        if (!MP) {
            return null;
        }
        Bc.QD = MP;
        return Bc;
    },
    FXf: function(eb) {
        if (this.GJ.length <= 0) {
            return null;
        }
        return this.GJ[eb];
    },
    po: function() {
        if (this.GJ.length <= 0) {
            return null;
        }
        return this.GJ[0];
    }
};

function sM(Bc, cv, Eo, xS, dv) {
    this.Bc = Bc;
    this.cv = cv;
    this.xS = xS;
    this.Eo = Eo;
    this.dv = dv;
}
sM.jq = 1;
sM.kd = 2;
sM.mN = 3;
sM.To = 4;
sM.ha = 5;
sM.tJ = 6;
sM.Nh = 7;
sM.prototype = {
    toString: function() {
        return ["[", 'sM', this.xS, this.Eo, this.dv, this.Bc, "]"].join("|");
    }
};

function ST(uu, Eo) {
    this.BG = uu;
    this.Eo = Eo;
}
ST.prototype = {
    eQE: function() {
        var cd = Ra.QVi(this.BG);
        if (!cd) {
            return true;
        }
        return cd.SUA(this.BG);
    },
    ueF: function() {
        return Ra.GWs(this.BG);
    },
    Wh: function(uZ) {
        if (this.Eo == sM.jq) {
            var NJ = Ra.QVi(this.BG);
            if (NJ) {
                NJ.VcB('ksL', this.BG);
            }
            Ra.KNt(this.BG);
        } else if (this.Eo == sM.kd) {
            Ra.pZZ(this.BG);
        }
    }
};
(function(ls) {
    ls.pO = function(UJ, Db) {
        this.UJ = UJ;
        this.Db = Db;
    };
    ls.pO.prototype = {
        Wh: function(uZ) {
            if (this.UJ != an) {
                return;
            }
            ls.FD.fx(this.sle, gA.policy.AB, this);
        },
        sle: function() {
            if (this.UJ != an) {
                return;
            }
            Gc.Yi(this.Db);
        }
    };
})(Lightstreamer);
var On = false;

function nk() {
    On = false;
    if (Lightstreamer.Kg() || aU.ZU()) {
        return;
    }
    if (Lightstreamer.ZK(6, true) || Lightstreamer.ZK(9, false)) {
        return;
    }
    try {
        if (Js.ZU()) {
            window.open(Lightstreamer.GE.hpL("LS_CONTROLFRAME").location, "LS_CONTROLFRAME", null, true);
            return;
        }
        var AR = new Ve("LS_CONTROLFRAME");
        if (!AR.IH(Lightstreamer.fO)) {
            Lightstreamer.FD.fx(nk, 1000);
        }
    } catch (CA) {}
}(function(ls) {
    var Cw = -1;
    var UQ = 0;
    var ll = 1;
    var sT = 2;
    var Ad = 3;
    var Cj = 4;
    ls.eL = function() {
        this.BF = ls.kZ.getLogger("AF");
        this.status = window.ActiveXObject || typeof(XMLHttpRequest) != "undefined" ? sT : Cw;
        this.Oo = 2000;
        this.CX = 6000;
        this.lM = null;
        this.Lw = ls.vb();
        this.oY = ls.vb();
        this.la = new Ub("LS_AJAXFRAME");
    };
    ls.eL.prototype = {
        Kj: function(uS) {
            this.Lw++;
            this.oY++;
            this.status = uS ? Ad : UQ;
        },
        IH: function(uS, uH) {
            if (this.status == Cw) {
                return;
            }
            var aI = AX(rl);
            this.BF.log('IH', aI, this.lM, uS, uH);
            if (aI == this.lM && (this.iaU() || !uH)) {
                return;
            } else {
                this.Kj(uS);
                var Pn = this.Lw;
                if (ls.TA()) {
                    this.BF.log('IH', 1);
                    ls.FD.fx(this.CsU, this.CX, this, [Pn, false, uH]);
                    return;
                }
                this.lM = aI;
                aI += gA.connection.KS + "/ajax_frame.html";
                var mv = "phase=" + this.oY + "&";
                if (ls.YX != null && ls.YX != "") {
                    mv += "domain=" + ls.YX + "&";
                }
                this.la.IH(new bc(aI, mv));
                ls.FD.fx(this.iXZ, this.CX, this, [Pn]);
                ls.FD.fx(this.JkB, this.Oo, this, [Pn]);
            }
        },
        dQg: function(gP) {
            if (ls.Yg) {
                return;
            }
            if (this.oY != gP) {
                return;
            }
            if (this.status != ll) {
                this.BF.log('dQg', 1);
                this.status = ll;
                if (kC) {
                    kC.WeO(Js);
                }
                if (Gc) {
                    Gc.WeO(Js);
                }
            }
        },
        fhp: function(CI, QD, wv) {
            if (this.isDisabled()) {
                return false;
            } else if (this.status !== ll) {
                if (this.status === sT) {
                    this.IH();
                }
                return null;
            }
            this.BF.log('fhp', this.status);
            var wM;
            try {
                wM = this.dpL(CI, QD, wv);
            } catch (Wq) {
                wM = false;
                this.BF.CP(Wq, 'fhp');
            }
            if (wM === false) {
                this.oV();
            }
            return wM;
        },
        dpL: function(CI, QD, wv) {
            try {
                var wM = ls.GE.hpL("LS_AJAXFRAME").sendRequest(CI, QD, wv);
                if (wM === false) {
                    this.BF.log('dpL', 4);
                    return false;
                }
            } catch (Wq) {
                this.BF.CP(Wq, 'dpL');
                return false;
            }
            this.BF.log('dpL', 5);
            return true;
        },
        CsU: function(Pn, uS, uH) {
            this.BF.log('CsU', 1, this.Lw, Pn, this.iaU());
            if (this.Lw == Pn && !this.iaU()) {
                this.IH(uS, uH);
            }
        },
        iXZ: function(Pn) {
            if (this.Lw == Pn && !this.iaU()) {
                this.BF.log('iXZ');
                this.lM = null;
                this.IH(true);
            }
        },
        JkB: function(Pn) {
            if (this.Lw == Pn && !this.iaU()) {
                this.BF.log('JkB');
                this.status = Cj;
            }
        },
        oV: function() {
            this.status = Cw;
            this.Lw++;
            this.oY++;
        },
        iaU: function() {
            return this.status === ll;
        },
        isDisabled: function() {
            return this.status === Cw || this.status === Ad || this.status === Cj;
        }
    };
})(Lightstreamer);
var BW = true;
self.LS_a = function(Pq) {
    Ns.dQg(Pq);
};
EF = Lightstreamer.kZ.getLogger("PR");
var xT = "network";

function AL(CA, Pq) {
    if (Lightstreamer.Yg || UJ != an) {
        return;
    }
    sP("failure2");
}

function nU(QD, UJ) {
    if (Lightstreamer.Yg || UJ != an) {
        return;
    }
    if (QD == null) {
        sP(xT + 1);
        return;
    }
    EF.log('nU');
    jW.hgG(UJ, QD);
}

function sP(nx) {
    if (pd == cT || pd == qL) {
        EF.log('sP', 1);
        Gc.uV.Gfs();
        Gc.NF(nx);
        return;
    }
    EF.log('sP', 2);
}

function eZ(wO) {
    if (wO == an) {
        Gc.uV.Gfs();
        Gc.NF(xT + 2);
    }
}(function(ls) {
    ls.qG = function() {
        this.Ro = [];
        this.BF = ls.kZ.getLogger("EQ");
    };
    ls.qG.prototype = {
        toString: function() {
            return "[EvalQueue|" + this.Ro.length + "]";
        },
        hgG: function(UJ, QD) {
            this.Ro.push({
                QT: UJ,
                d: QD
            });
            this.BF.log('hgG', this);
            ls.FD.fx(this.UbY, 0, this);
        },
        os: function(uL) {
            this.BF.log('os', this);
            Ns.oV();
            this.Ro = [];
            Gc.NF("failure" + uL);
        },
        UbY: function() {
            this.BF.log('UbY', this);
            try {
                var pT = ls.GE.hpL("LS_POLLFRAME");
            } catch (Wq) {
                this.os(3);
                return;
            }
            var dW = false;
            while (this.Ro.length > 0) {
                var uq = this.Ro.shift();
                if (uq.QT != an) {
                    continue;
                }
                try {
                    if (!pT.evalProxy(uq.d)) {
                        this.os(1);
                        return;
                    }
                } catch (Wq) {
                    this.os(4);
                    return;
                }
            }
        }
    }
})(Lightstreamer);
(function(ls) {
    var dt = false;
    var dN = new RegExp("\\.", ls.Fr);
    var wr = new RegExp("-", ls.Fr);
    Lightstreamer.LightstreamerEngine = function() {
        this.BF = ls.kZ.getLogger("LE");
        if (!arguments[4] || arguments[4] != "1446") {
            throw "The Lightstreamer library was not correctly loaded due to some incomplete caching.\n Please reload the page";
        }
        this.Eh = new ls.cD();
        this.Eh.parent = this;
        this.Eh.or = arguments[0];
        this.eJ = null;
        if (!arguments[1]) {
            this.BF.error("Error reading engine id.", "createEngine");
            this.eJ = ls.vb();
        } else {
            this.eJ = arguments[1];
        }
        this.CS = null;
        if (!arguments[2]) {
            this.BF.error("Please specify a valid application name", "createEngine");
            this.CS = "default";
        } else {
            this.CS = arguments[2];
        }
        this.YR = ls.EJ + this.CS;
        this.wf = ls.EJ + this.eJ + "_" + this.CS;
        if (arguments[3]) {
            document.write("<script src='lsdebug.js'></script>");
        }
        this.connection = new ls.Connection();
        this.connection.parent = this;
        this.policy = new ls.Policy();
        this.policy.parent = this;
        this.context = ls.GQ;
        if (this.Eh.or) {
            this.onStatusChange = null;
        }
        this.SS = [];
        this.wo = window;
        this.JW = false;
    };
    Lightstreamer.LightstreamerEngine.prototype = {
        hSD: function(Xu) {
            if (this.JW) {
                return;
            }
            if (Xu.Dh) {
                this.Eh.Dh = Xu.Dh.toString();
            } else {
                for (var GN in Xu) {
                    this[GN].jg(Xu[GN]);
                }
                this.context.Kw();
                this.context.DQ();
                if (this.Eh.GI != ls.aH) {
                    this.changeStatus(this.Eh.GI);
                }
            }
            ls.kZ.Pe(Ih);
            if (ls.pW) {
                if (ls.aV(this.YR, this.eJ)) {
                    this.BF.QA('UC', 7);
                }
                var LD = ls.QX(this.wf);
                this.Eh.Vh('PB', LD ? LD[1] : "N");
                LD = [ls.gQ(), this.Eh.PB, this.getEngineFrameName()];
                if (ls.ms(2)) {
                    LD.push(location.host);
                }
                ls.xK(this.wf, LD);
                ls.cI();
                ls.FD.lD(ls.YL, 60000);
            } else {
                this.Eh.Vh('PB', "N");
            }
            this.JW = true;
        },
        getPushPages: function() {
            var Nj = [];
            var QR = Ra.iuc();
            for (var GN in QR) {
                if (QR[GN].iUe()) {
                    try {
                        var wS = QR[GN].uoZ();
                        Nj.push(wS.AD);
                    } catch (Wq) {}
                }
            }
            return Nj;
        },
        changeStatus: function(Uf) {
            this.BF.QA("changeStatus", Uf);
            this.BF.kw(Uf == ls.Qa || Uf == ls.aH || Uf == ls.gU, "changeStatus");
            this.Eh.Vh('GI', Uf);
            if (MR == true) {
                return;
            }
            if (Uf == ls.aH || Uf == ls.Qa) {
                ki = false;
            } else {
                ki = true;
            }
            if (Uf == ls.aH) {
                Gc.wh();
            } else if (Uf == ls.gU || Uf == ls.Qa) {
                var lm = Uf == ls.gU ? eU : Yr;
                if (Gc.pcT()) {
                    Gc.Ru(lm, null);
                } else {
                    Gc.NF(null, lm, true);
                }
            }
        },
        getStatus: function() {
            var Nk = null;
            if (pd == cT || pd == qL) {
                if (Gc.fM == eU || Gc.Ld == -1) {
                    Nk = ls.gU;
                } else if (kg >= 2) {
                    Nk = ls.KH;
                } else if (Gc.DS < Gc.Ld) {
                    Nk = ls.NU;
                } else {
                    Nk = ls.Qa;
                }
            } else if (pd == FF) {
                Nk = ls.NU;
            } else if (pd == CM || pd == Jk) {
                Nk = ls.aH;
            }
            this.BF.QA("getStatus", Nk);
            return Nk;
        },
        sendMessage: function(xI, iO, Vg, GC) {
            if (this.getStatus() == ls.aH) {
                return false;
            }
            IA.Mmk(xI, iO, Vg, GC);
            return true;
        },
        wkv: function(xI) {
            var vF = LS_build && LS_build != ("build" + "_placeholder") ? LS_build : 0;
            var jL = "LS_phase=" + an + "&";
            var ct = "LS_build=" + vF + "&" + jL + xI;
            kC.TtA(null, ct, sM.ha, null);
            return true;
        },
        bind: function() {
            if (!this.context.bind()) {
                return false;
            }
            gA = this;
            this.context.parent = this;
            ls.kZ.SW();
            ls.Ui({
                Vbb: "96886926756676586186106",
                jFO: "28442324223623531823424",
                sMn: "52312352492633183053182",
                UEk: "12605606620604633611619",
                KPN: "41239251304236249241253",
                Tbr: "24923623423523424624724",
                RBl: "52423042312312313182482",
                FeG: "61661661562862663164512"
            });
            with(ls) {
                tG += Ta("" + jFO + sMn + KPN + Tbr + RBl + Vbb + UEk + FeG, "document", 116, 2, 721);
            }
            ls.Ui({
                OOX: "39318229234236249238239",
                MJZ: "23623831824225323323425",
                BSH: "12492422422492342402770"
            });
            return true;
        },
        onServerError: function(fQ, Tx) {
            alert("Error " + fQ + "\n" + Tx);
        },
        getEngineFrameName: function() {
            if (!gA.YA) {
                var uP = document.domain;
                uP = uP.replace(dN, "_");
                uP = uP.replace(wr, "__");
                gA.YA = uP + "_" + this.eJ + "_" + gA.CS;
            }
            return gA.YA;
        },
        getApplicationName: function() {
            return this.CS;
        },
        getSessionServerName: function() {
            return LI;
        },
        getSessionServerAddress: function() {
            return rl;
        },
        qj: function(jO) {
            dt = (jO) ? true : false;
        },
        onClientError: function(HQ) {
            return;
        },
        onClientAlert: function(code, HQ) {
            ls.FD.fx(alert, 0, null, ["Warning " + code + "\n" + HQ]);
        },
        onStatusChange: function(fw) {
            fw = fw.toLowerCase();
            qP = fw;
            op();
        }
    };
})(Lightstreamer);

function mu() {
    this.II = false;
    this.lG = 0;
    this.ne = {};
    this.BF = Lightstreamer.kZ.getLogger("MR");
}
mu.prototype = {
    mb: function() {
        this.II = false;
        this.ne = {};
        this.lG++;
        this.BF.log('mb');
    },
    JZu: function() {
        if (!this.II) {
            for (Bw in this.ne) {
                var Cb = this.ne[Bw];
                for (eb in Cb.NK) {
                    if (Cb.NK[eb].ct != null) {
                        var qp = new Nm(this.lG, Cb, eb);
                        this.Ah(eb, ct, qp);
                    }
                }
            }
            this.II = true;
            this.BF.log('JZu');
        }
    },
    Mmk: function(DL, iO, Vg, Sr) {
        this.BF.log('Mmk', 1, DL, iO, Sr);
        var Cb = this.ne[iO];
        if (Cb == null) {
            Cb = {};
            Cb.Tb = -1;
            Cb.NK = {};
            this.ne[iO] = Cb;
        }
        Cb.Tb++;
        var ct = "LS_message=" + Lightstreamer.dj(DL) + "&LS_req_phase=" + Cb.Tb + "&";
        if (iO != "") {
            ct += "LS_sequence=" + iO + "&";
        }
        if (Sr != null) {
            ct += "LS_max_wait=" + Sr + "&";
        }
        var ZM = {};
        ZM.ct = ct;
        ZM.Vg = Vg;
        Cb.NK[Cb.Tb] = ZM;
        if (this.II) {
            var qp = new Nm(this.lG, Cb, Cb.Tb);
            this.Ah(Cb.Tb, ct, qp);
            this.BF.log('Mmk', 2);
        }
    },
    TCi: function(eb, Pq, qp) {
        if (Pq == this.lG) {
            if (qp.Cb.NK[eb]) {
                if (qp.Cb.NK[eb].ct != null) {
                    this.Ah(eb, qp.Cb.NK[eb].ct, qp);
                }
            }
        }
    },
    Ah: function(eb, ct, qp) {
        kC.TtA(eb, ct, sM.To, qp);
    },
    Asb: function(iO, eb) {
        var Cb = this.ne[iO];
        if (Cb.NK[eb]) {
            if (Cb.NK[eb].ct != null) {
                Cb.NK[eb].ct = null;
            }
            if (Cb.NK[eb].Vg == null) {
                delete(Cb.NK[eb]);
            }
        }
    },
    Ov: function(Cb, eb) {
        if (Cb.NK[eb]) {
            delete(Cb.NK[eb]);
        }
    },
    gE: function(Cb, eb, Ax, xI) {
        if (Cb.NK[eb]) {
            if (Cb.NK[eb].Vg != null) {
                var oP = Cb.NK[eb].Vg;
                var NJ = Ra.Nru(oP.TD);
                if (!NJ) {
                    this.BF.log('gE', 1);
                    return;
                }
                NJ.VcB('dlH', {
                    df: oP.df,
                    Ax: Ax,
                    xI: xI
                });
            }
        }
    },
    hvP: function(iO, eb) {
        this.Mg(iO, eb, 1, null);
    },
    Mg: function(iO, eb, Ax, xI) {
        var Cb = this.ne[iO];
        this.gE(Cb, eb, Ax, xI);
        this.Ov(Cb, eb);
    }
};

function Nm(UJ, ui, Ik) {
    this.Cb = ui;
    this.eb = Ik;
    this.Pq = UJ;
    this.Zm = 0;
}
Nm.prototype = {
    Wh: function(uZ) {
        this.Zm++;
        if (this.Zm >= 5) {
            return;
        } else {
            Lightstreamer.FD.fx(IA.TCi, 4000, IA, [this.eb, this.Pq, this]);
        }
    }
};
(function(ls) {
    var JO = new RegExp(ls.EJ + "\\d+_[^=]+=[^;]+");
    var OG = new RegExp("^" + ls.EJ + ".+$");
    ls.YL = function() {
        var Uq = document.cookie.toString();
        if (!Uq) {
            return;
        }
        Uq = Uq.split(";");
        var Lr = [];
        for (var GN = 0; GN < Uq.length; GN++) {
            Uq[GN] = ls.sB(Uq[GN]);
            if (Uq[GN].match(OG) != null) {
                Lr.push(Uq[GN]);
            }
        }
        for (var GN = 0; GN < Lr.length; GN++) {
            if (Lr[GN].match(JO) != null) {
                var Np = Lr[GN].split("=")[0];
                var mY = ls.QX(Np);
                if (!mY) {
                    ls.fK(Np);
                    continue;
                }
                var LJ = ls.gQ() - Number(mY[0]);
                if (LJ > 30000) {
                    ls.fK(Np);
                }
            }
        }
        for (var x = 0; x < Lr.length; x++) {
            if (!Lr[x].match(JO)) {
                var Rc = Lr[x].split("=")[0];
                Rc = ls.vK(Rc);
                var Qn = ls.QX(Rc);
                if (Qn) {
                    for (var se = 0; se < Qn.length; se++) {
                        if (Qn[se].indexOf("_") > 1) {
                            if (!ls.IY(ls.EJ + Qn[se])) {
                                ls.Fb(Rc, Qn[se]);
                            }
                        } else {
                            var oQ = Rc.substr(4);
                            if (!ls.IY(ls.EJ + Qn[se] + "_" + oQ)) {
                                ls.Fb(Rc, Qn[se]);
                            }
                        }
                    }
                }
            }
        }
    }
})(Lightstreamer);
(function(ls) {
    var vJ = null;
    var kS = 0;

    function rf() {
        if (JV) {
            uK.log('rf', 4);
            JV = false;
            return;
        }
        var Fj = false;
        var Df = ls.QX(gA.wf);
        if (!Df) {
            Df = [0, gA.Eh.PB, gA.getEngineFrameName(), document.location.host];
        }
        if (Df[1] == "S") {
            var bo = ls.QX(gA.YR);
            if (!bo) {
                uK.log('rf', 1);
            } else {
                for (var GN = 0; GN < bo.length && !ls.Yg; GN++) {
                    if (bo[GN] == gA.eJ) {
                        continue;
                    }
                    var LD = ls.QX(ls.EJ + bo[GN] + "_" + gA.getApplicationName());
                    if (!LD || LD[1] != "S") {
                        continue;
                    }
                    if (LD[0] == Df[0]) {
                        kS = ls.vb(5);
                    }
                    if (LD[0] > Df[0]) {
                        uK.log('rf', 2, bo[GN], LD[0], Df[0]);
                        Fj |= qZ(bo[GN], LD[0]);
                    } else if (MM[bo[GN]]) {
                        delete(MM[bo[GN]]);
                    }
                }
            }
        }
        if (!Fj) {
            ls.aV(gA.YR, gA.eJ);
            Df[0] = ls.gQ() + kS;
            ls.xK(gA.wf, Df);
        }
    }
    var MM = {};

    function qZ(id, value) {
        if (MM[id]) {
            if (MM[id] != value) {
                uK.log('qZ', 2, id, value, MM[id]);
                RS();
            } else {
                uK.log('qZ', 3, id, value);
                return false;
            }
        }
        uK.log('qZ', 1, id, value);
        MM[id] = value;
        return true;
    }

    function RS() {
        ls.FD.vL(vJ);
        vJ = null;
        tl(true);
        JE();
        window.Ra = null;
        ls.FD.fx(document.location.replace, 60000, document.location, [ls.fp]);
    }
    ls.cI = function() {
        vJ = ls.FD.lD(rf, ls.tu);
    };
})(Lightstreamer);
var qP = "";
var sw = 0;
var ZB;
var UW = false;

function op() {
    var pq = Ra.Rhp("onStatusChange");
    if (pq || gA.onStatusChange != Lightstreamer.LightstreamerEngine.prototype.onStatusChange) {
        UW = false;
        Lightstreamer.FD.vL(ZB);
        ZB = null;
        return;
    }
    var kO = "Lightstreamer";
    if (qP == "streaming") {
        kO += " is in streaming mode";
    } else if (qP == "polling") {
        kO += " is in smart polling mode";
    } else if (qP == "stalled") {
        kO += " connection is stalled";
    } else {
        kO += " is " + qP;
    }
    if (qP == "polling" || qP == "connecting" || qP == "streaming") {
        for (GN = 1; GN <= sw; GN++) {
            kO = kO + ".";
        }
        if (sw >= 3) {
            sw = 0;
        } else {
            sw++;
        }
    }
    window.status = kO;
    if (!UW) {
        ZB = Lightstreamer.FD.lD(op, 1000);
        UW = true;
    }
}

function eA() {
    this.BF = Lightstreamer.kZ.getLogger("EH");
};
eA.prototype = {
    Hv: function(Li) {
        if (Li == null) {
            return null;
        } else {
            return Li.toString();
        }
    },
    EXc: function(NN) {
        if (NN.nW) {
            gA.hSD(NN.nW);
        }
        Ra.Ias(NN.win, parseInt(NN.uQ));
    },
    PVS: function(NN) {
        Ra.fWQ(parseInt(NN.uO), this.Hv(NN.dC), parseInt(NN.tq), parseInt(NN.TD), parseInt(NN.SM), this.Hv(NN.Ob));
    },
    UiD: function(NN) {
        Ra.subscribeTable(parseInt(NN.TD), parseInt(NN.JL), parseInt(NN.Ea));
    },
    ar: function(NN) {
        if (NN.JL) {
            Ra.ar(parseInt(NN.JL));
        } else {
            Ra.elG(parseInt(NN.TD), this.Hv(NN.dC));
        }
    },
    rZT: function(NN) {
        Ra.GZ(parseInt(NN));
    },
    wkv: function(mE) {
        gA.wkv(this.Hv(mE));
    },
    qj: function() {
        gA.qj();
    },
    SXd: function(NN) {
        gA.sendMessage(this.Hv(NN.xI), Lightstreamer.sg(NN.iO), NN.Vg, Lightstreamer.sg(NN.Sr));
    },
    Dch: function(NN) {
        var tY = this.Hv(NN.tY);
        gA[NN.Dd].Vh(tY, NN.Bi);
        if (tY == 'PK' && (pd == cT || pd == qL)) {
            var QD = "LS_op=constrain&" + kp();
            kC.TtA(null, QD, sM.mN);
        } else if (tY == 'Fq') {
            gA.context.Kw();
        } else if (tY == 'VY') {
            gA.context.DQ();
        }
    },
    VoO: function(Uf) {
        gA.changeStatus(this.Hv(Uf));
    }
};
(function(ls) {
    ls.xZ = function(EN) {
        this.EN = EN;
        this.Us = true;
        this.Sr = 100;
    };
    ls.xZ.prototype = {
        NlB: function() {
            var dW = this.Sr;
            this.Sr += 5000;
            return dW;
        },
        toString: function() {
            return ["[", 'xZ', this.Us, this.EN, this.Sr, "]"].join("|");
        }
    };
})(Lightstreamer);
(function(ls) {
    ls.Zo = function() {
        this.tS = {};
        this.vv = 1;
        this.mW = {};
        this.qT = 1;
        this.wN = ls.vb();
        this.cL = {};
        this.qD = {};
        this.ZP = ls.vb(100) + 1;
        this.BF = ls.kZ.getLogger("PH");
        ls.FD.lD(this.ZrT, 5000, this);
    };
    ls.Zo.prototype = {
        ERY: function(LV, Jx) {
            if (LV == -1) {
                this.BF.log('ERY', 1);
                return true;
            }
            var iP = this.Nru(LV);
            if (!iP) {
                this.BF.log('ERY', 2);
                return false;
            }
            this.BF.log('ERY', 3, this.ZP, Jx);
            if (!Jx) {
                return true;
            }
            return Jx == this.ZP;
        },
        Nru: function(TD) {
            if (!this.tS[TD]) {
                this.BF.log('Nru', TD);
                return null;
            }
            return this.tS[TD];
        },
        QVi: function(JL) {
            var TD = this.mW[JL];
            return this.Nru(TD);
        },
        iuc: function() {
            return this.tS;
        },
        Ias: function(QE, qv) {
            var QG = this.vv++;
            var AM = new ls.vi(QE, qv, this);
            this.tS[QG] = AM;
            this.BF.log('Ias', QG, qv, this.ZP);
            AM.mMo(QG, this.ZP);
        },
        elG: function(TD, dC) {
            this.BF.log('elG', 1, TD, dC);
            if (TD && this.tS[TD]) {
                this.tS[TD].DIQ(dC);
            }
        },
        ar: function(JL) {
            this.BF.log('ar', 1, JL);
            var TD = this.mW[JL];
            if (TD && this.tS[TD]) {
                this.BF.log('ar', 2);
                this.tS[TD].XfF(JL);
            } else {
                this.BF.kw(false, 'ar');
            }
            delete(this.mW[JL]);
            var OQ;
            if ((OQ = this.qD[JL])) {
                if (OQ.Us) {
                    var vT = OQ.NlB();
                    OQ.Us = false;
                    if (vT > 5000) {
                        so.Jds(AX());
                    }
                    this.BF.log('ar', 3, JL, OQ);
                    ls.FD.fx(this.GKx, vT, this, [JL, OQ.EN]);
                }
            }
        },
        nLG: function(JL) {
            this.BF.log('nLG', JL);
            delete(this.qD[JL]);
            delete(this.cL[JL]);
        },
        GZ: function(eb) {
            this.BF.log('GZ', 1, eb);
            if (this.tS[eb]) {
                var xN = this.tS[eb].QjG();
                for (var JL in xN) {
                    this.ar(JL);
                }
                ls.Qe.remove(this.tS[eb].pk);
                delete(this.tS[eb]);
            }
        },
        KNt: function(JL) {
            this.cL[JL] = true;
        },
        pZZ: function(JL) {
            if (this.qD[JL]) {
                this.qD[JL].Us = true;
            }
        },
        GWs: function(JL) {
            return this.cL[JL];
        },
        Rhp: function(RL, iu, Jj) {
            var QR = this.tS;
            var pq = false;
            for (var GN in QR) {
                if (!pq) {
                    try {
                        var wS = QR[GN].uoZ();
                        if (wS.AD.IZ && (wS.AD.IZ[RL] || wS.AD.IZ[RL] === null)) {
                            pq = true;
                        }
                    } catch (Wq) {
                        this.BF.CP(Wq, 'Rhp');
                    }
                }
                if (iu) {
                    QR[GN].VcB(iu, Jj);
                } else if (pq) {
                    return true;
                }
            }
            return pq;
        },
        SDA: function(Uf, uE) {
            this.BF.log('SDA', uE, Uf);
            return this.Rhp("onStatusChange", 'anm', {
                status: Uf
            });
        },
        fWQ: function(uO, dC, tq, TD, SM, Ob) {
            this.BF.kw(pd == cT || pd == qL, 'fWQ');
            var DC = this.tS[TD];
            if (!DC) {
                this.BF.kw(false, 'fWQ', 1, TD);
                return;
            }
            if (!Tg == null) {
                this.BF.log('fWQ', 2);
                return;
            }
            var JL;
            if (DC.IeJ(dC, tq, uO)) {
                JL = DC.iVV(dC);
            } else {
                JL = this.qT++;
                this.mW[JL] = TD;
                var Yb = this.PWD(Ob, JL);
                DC.SkS(JL, dC, Yb.add, tq, uO);
                this.qD[JL] = new ls.xZ(Yb.remove);
            }
            this.BF.log('fWQ', 1, TD, JL, dC);
            Pp = {
                uO: uO,
                tq: tq,
                dC: dC,
                JL: JL
            };
            DC.VcB('kUH', Pp);
        },
        subscribeTable: function(TD, JL, Ea) {
            if (Ea >= 3) {
                so.Jds(AX());
            }
            var DC = this.tS[TD];
            var rO = DC.jOn(JL);
            if (rO) {
                kC.TtA(JL, rO, sM.jq, new ST(JL, sM.jq), Ea >= 2);
            }
        },
        PWD: function(Ob, JL) {
            var SV = "LS_table=" + JL + "&";
            var SM = "LS_req_phase=" + (this.wN++) + "&";
            var NA = "LS_win_phase=" + this.ZP + "&";
            var dd = SV + NA + SM;
            return {
                add: dd + "LS_op=add&" + Ob,
                remove: dd + "LS_op=delete&"
            };
        },
        bSL: function(BK) {
            var QR = this.tS;
            this.tS = {};
            for (var GN in QR) {
                QR[GN].NQ('tat', {
                    BK: BK
                });
            }
        },
        Kjj: function(BK) {
            var QR = this.tS;
            for (var GN in QR) {
                QR[GN].NQ('jc');
            }
        },
        ZrT: function() {
            for (var GN in this.tS) {
                if (!this.tS[GN].iUe()) {
                    this.BF.log('ZrT', GN);
                    this.GZ(GN);
                }
            }
        },
        Gr: function() {
            this.qD = {};
            var QR = this.tS;
            for (var GN in QR) {
                QR[GN].VcB('jXu', {
                    Pq: this.ZP + 1,
                    Cc: LI,
                    Zv: rl
                });
            }
            this.ZP++;
        },
        VJ: function() {
            this.qD = {};
            var QR = this.tS;
            for (var GN in QR) {
                QR[GN].VcB('MEa', {
                    Pq: this.ZP + 1
                });
            }
            this.ZP++;
        },
        GKx: function(eb, be) {
            this.BF.QA('GKx', arguments);
            if (!this.qD[eb]) {
                return;
            }
            if (pd != cT && pd != qL) {
                return;
            }
            if (Tg == null) {
                this.BF.kw(false, 'GKx');
                return;
            }
            kC.TtA(eb, be, sM.kd, new ST(eb, sM.kd));
        }
    };
})(Lightstreamer);
(function(ls) {
    ls.vi = function(QE, qv, ER) {
        this.BF = ls.kZ.getLogger("PH");
        this.tc = new ls.hS(QE);
        this.CC = {};
        this.Ll = {};
        this.qv = qv;
        this.OP = ER;
        this.sC = null;
        this.pk = new ls.Qe(Ra, new eA(), ls.FD, false);
    };
    ls.vi.prototype = {
        mMo: function(LV, rq) {
            this.sC = LV;
            this.NQ('JZj', {
                win: LV,
                ZP: rq,
                eJ: gA.eJ,
                Eh: new ls.cD(gA.Eh),
                policy: new ls.Policy(gA.policy),
                connection: new ls.Connection(gA.connection),
                context: new ls.Context(gA.context),
                status: gA.getStatus(),
                DT: Gc.pcT(),
                Cc: LI,
                Zv: rl
            });
        },
        NQ: function(Jp, NN) {
            this.iN(Jp, NN, false);
        },
        VcB: function(Jp, NN) {
            this.iN(Jp, NN, true);
        },
        iN: function(Jp, NN, Bn) {
            var wS = this.uoZ();
            try {
                wS.Et.UM(Jp, this.qv, NN, Bn ? this.OP.ZP : null);
            } catch (Wq) {
                this.BF.CP(Wq, 'iN', this.sC, Jp);
                this.OP.GZ(this.sC);
            }
        },
        QjG: function() {
            return this.Ll;
        },
        jOn: function(JL) {
            if (this.Ll[JL]) {
                return this.Ll[JL].Ob;
            }
            return null;
        },
        iVV: function(dC) {
            if (this.CC[dC]) {
                return this.CC[dC].eb;
            }
            return null;
        },
        IeJ: function(dC, tq, uO) {
            return this.CC[dC] && this.CC[dC].tq == tq && this.CC[dC].uO == uO;
        },
        SkS: function(JL, dC, Ob, tq, uO) {
            this.BF.log('SkS', JL, dC);
            var vP = {
                eb: JL,
                Ob: Ob,
                tq: tq,
                uO: uO,
                id: dC
            };
            this.CC[dC] = vP;
            this.Ll[JL] = vP;
        },
        XfF: function(JL) {
            if (!this.Ll[JL]) {
                return;
            }
            var dC = this.Ll[JL].id;
            delete(this.CC[dC]);
            delete(this.Ll[JL]);
            this.BF.log('XfF', JL, dC);
        },
        DIQ: function(dC) {
            var JL = this.iVV(dC);
            this.BF.log('DIQ', dC, JL);
            this.OP.ar(JL);
        },
        uoZ: function() {
            try {
                return this.tc.Vl.Lightstreamer;
            } catch (Wq) {
                this.BF.log('uoZ', 3, this.sC);
                return null;
            }
        },
        SUA: function(JL) {
            try {
                var md = this.uoZ();
                var sJ = md.jD.fXg(JL);
                this.BF.log('SUA', 1, JL);
                if (!sJ) {
                    return false;
                }
                return sJ.bnu();
            } catch (Wq) {
                this.BF.CP(Wq, 'SUA');
                return false;
            }
        },
        iUe: function() {
            try {
                var VB = this.tc.HS();
                if (this.tc.Vl == null || !this.tc.Vl.Lightstreamer.rG || (this.tc.Vl.Lightstreamer.rG.Ne !== null && this.tc.Vl.Lightstreamer.rG.Ne != this.sC)) {
                    this.BF.log('iUe', 2, this.sC, VB.log);
                    return false;
                }
                return true;
            } catch (Wq) {
                this.BF.CP(Wq, 'iUe', 3, this.sC);
                return false;
            }
        }
    };
})(Lightstreamer);
Lightstreamer.GE = new Lightstreamer.ks();
var Ns = new Lightstreamer.eL();
var Gn = new Lightstreamer.Jc();
var rv = Lightstreamer.kZ.getLogger("PF");
var pP = Lightstreamer.kZ.getLogger("UP");
var uX = Lightstreamer.kZ.getLogger("LC");
var Og = Lightstreamer.kZ.getLogger("OP");
var uK = Lightstreamer.kZ.getLogger("CH");
var kC = new Lightstreamer.Hj();
var IA = new mu();
var Ra = new Lightstreamer.Zo();
var jW = new Lightstreamer.qG();
var so = new Lightstreamer.MI();
var tX = new Lightstreamer.Qe(Ra, new eA(), Lightstreamer.FD, true);
var Gc = new Lightstreamer.wE();
self.LS_forceReload = Lightstreamer.getClosureFor(Gc.NF, Gc)("server.exit");
Lightstreamer.xL("beforeunload", JE);
Lightstreamer.xL("beforeunload", jc);
Lightstreamer.xL("unload", JE);
Lightstreamer.xL("unload", LS_onunld);
Lightstreamer.kZ.Qq();
uX.log("engine", "lsengine.js parsed");
