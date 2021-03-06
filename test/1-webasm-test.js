'use strict';
const catirt_load = require('../dist/catirt');
const mathjs = require('mathjs');
const assert = require('assert').strict;
let catirtlib = {};

// helper function for converting values to a fixed precision string for simple comparison
function format(a, precision=6) {
  return mathjs.format(a, {precision});
}

describe('catIrt webasm', function () {
  // setup data
  const range = [-4.5, 4.5];
  const theta = [-1.3, 1.3];
  const uresp = [
      [1, 1, 1, 0, 0],
      [0, 0, 1, 0, 1]
  ];
  const uresp_grm = [
      [1, 2, 1, 3, 1],
      [2, 1, 3, 3, 2]
  ];
  const items = [
    {id: 'item1', params: [1.55,-1.88,0.12]},
    {id: 'item2', params: [3.02,-0.38,0.12]},
    {id: 'item3', params: [1.9,-0.1,0.12]},
    {id: 'item4', params: [2.06,0.41,0.12]},
    {id: 'item5', params: [1.48,0.72,0.12]}
  ];
  const itemparams = items.map(item => item.params);

  // load wasm (asynchronous)
  before('loading catirtlib wasm module', function(done) {
    catirt_load().then(function(Module) {
      catirtlib = Module;
      done();
    });
  });

  // define test suite
  describe('wasm_p_brm:', function () {
    it('wasm_p_brm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::p.brm(theta, params)`
      const expected = [
        [0.7454547, 0.1714823, 0.2016578, 0.1452349, 0.1621502],
        [0.9936800, 0.9945256, 0.9424697, 0.8787063, 0.7380471]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_p_brm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_p_grm:', function () {
    it('wasm_p_grm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::p.grm(theta, params)`
      const expected = [
        [0.289256041, 0.941497379, 0.90720705,  0.97132401,  0.95210207],
        [0.611083234, 0.044961626, 0.02970148, -0.02224582, -0.06104348],
        [0.099660725, 0.013540995, 0.06309147,  0.05092180,  0.10894141],
        [0.007181782, 0.006220902, 0.06537533,  0.13783373,  0.29767374],
        [0.131175662, 0.021334889, 0.03066643, -0.05697974, -0.14917190],
        [0.861642555, 0.972444209, 0.90395823,  0.91914601,  0.85149816]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_p_grm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_pder1_brm:', function () {
    it('wasm_pder1_brm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::pder1.brm(theta, params)`
      const expected = [
        [0.280420646, 0.14638078, 0.1407530, 0.05049314, 0.05939428],
        [0.009725599, 0.01642982, 0.1021615, 0.21542517, 0.27228506]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_pder1_brm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_pder1_grm:', function () {
    it('wasm_pder1_grm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::pder1.grm(theta, params)`
      const expected = [
        [-0.31865982, -0.16634180, -0.15994660, -0.05737857, -0.0674935],
        [ 0.17958070,  0.12600173,  0.04763581, -0.04217870, -0.0761748],
        [ 0.13907912,  0.04034006,  0.11231079,  0.09955727,  0.1436683],
        [-0.01105182, -0.01867025, -0.11609266, -0.24480133, -0.3094148],
        [-0.17373091, -0.06225509, -0.04886106,  0.09170908,  0.1222703],
        [ 0.18478273,  0.08092534,  0.16495372,  0.15309225,  0.1871446]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_pder1_grm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_pder2_brm:', function () {
    it('wasm_pder2_brm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::pder2.brm(theta, params)`
      const expected = [
        [-0.18320057,  0.39034545,  0.2177993,  0.09805036,  0.07948274],
        [-0.01485815, -0.04900072, -0.1687273, -0.32144128, -0.16306764]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_pder2_brm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_pder2_grm:', function () {
    it('wasm_pder2_grm(theta, params)', function () {
      // expected values from R equivalent: `catIrt::pder2.grm(theta, params)`
      const expected = [
        [ 0.20818246, -0.44357438, -0.24749925, -0.11142086, -0.090321296],
        [-0.38078685,  0.32504671,  0.06103500, -0.07278022, -0.075979567],
        [ 0.17260439,  0.11852767,  0.18646425,  0.18420108,  0.166300863],
        [ 0.01688426,  0.05568264,  0.19173559,  0.36527418,  0.185304135],
        [ 0.19027416,  0.17524291,  0.06147518, -0.10090201,  0.009407556],
        [-0.20715842, -0.23092555, -0.25321076, -0.26437218, -0.194711691]
      ];

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_pder2_grm(mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_lder1_brm:', function () {
    it('wasm_lder1_brm(u, theta, params, "MLE")', function () {
      // expected values from R equivalent: `catIrt::lder1.brm(u, theta, params, type='MLE')`
      const expected = [1.797812, -5.838820];

      const mResp = catirtlib.MatrixFromArray(uresp);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder1_brm(mResp, mTheta, mParams, catirtlib.LderType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_lder1_brm(u, theta, params, "WLE")', function () {
      // expected values from R equivalent: `catIrt::lder1.brm(u, theta, params, type='WLE')`
      const expected = [2.067604, -6.474561];

      const mResp = catirtlib.MatrixFromArray(uresp);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder1_brm(mResp, mTheta, mParams, catirtlib.LderType.WLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_lder1_grm:', function () {
    it('wasm_lder1_grm(u, theta, params, "MLE")', function () {
      // expected values from R equivalent: `catIrt::lder1.grm(u, theta, params, type='MLE')`
      const expected = [3.408681, -4.796249];

      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder1_grm(mResp, mTheta, mParams, catirtlib.LderType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_lder1_grm(u, theta, params, "WLE")', function () {
      // expected values from R equivalent: `catIrt::lder1.grm(u, theta, params, type='WLE')`
      const expected = [4.048207, -5.598181];

      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder1_grm(mResp, mTheta, mParams, catirtlib.LderType.WLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_lder2_brm:', function () {
    it('wasm_lder2_brm(u, theta, params)', function () {
      // expected values from R equivalent: `catIrt::lder2.brm(u, theta, params)`
      const expected = [
        [-0.38726367,  1.54763399,  0.5928689, -0.1181999, -0.09989038],
        [-0.01713032, -0.05638416, -0.1907768, -0.5042907, -0.35705145]
      ];

      const mResp = catirtlib.MatrixFromArray(uresp);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder2_brm(mResp, mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_lder2_grm:', function () {
    it('wasm_lder2_grm(u, theta, params)', function () {
      // expected values from R equivalent: `catIrt::lder2.grm(u, theta, params)`
      const expected = [
        [-0.4939227, -0.62417921, -0.3038985, -0.205088, -0.09989038],
        [-0.3035435, -0.05638416, -0.3134121, -0.315370, -0.73490795]
      ];

      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_lder2_grm(mResp, mTheta, mParams);

      assert.strictEqual(format(catirtlib.MatrixToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_logLik_brm:', function () {
    it('wasm_logLik_brm(u, theta, params)', function () {
      // expected values from R equivalent: `catIrt::logLik.brm(u, theta, params)`
      const expected = [-3.992064, -12.744254];

      const mResp = catirtlib.MatrixFromArray(uresp);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_logLik_brm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_logLik_brm(u[0], theta[0], params)', function () {
      // expected values from R equivalent: `catIrt::logLik.brm(u, theta, params)`
      const expected = [-3.992064];

      const mResp = catirtlib.MatrixFromArray([uresp[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([[theta[0]]]);
      const res = catirtlib.wasm_logLik_brm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_logLik_brm(u[0], theta, params)', function () {
      // expected values from R equivalent: `catIrt::logLik.brm(u, theta, params)`
      const expected = [-3.992064, -3.520212];

      const mResp = catirtlib.MatrixFromArray([uresp[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_logLik_brm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_logLik_grm:', function () {
    it('wasm_logLik_grm(u, theta, params)', function () {
      // expected values from R equivalent: `catIrt::logLik.grm(u, theta, params)`
      const expected = [-7.466321, NaN];

      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_logLik_grm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_logLik_grm(u[0], theta[0], params)', function () {
      // expected values from R equivalent: `catIrt::logLik.grm(u, theta, params)`
      const expected = [-7.466321];

      const mResp = catirtlib.MatrixFromArray([uresp_grm[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([[theta[0]]]);
      const res = catirtlib.wasm_logLik_grm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });

    it('wasm_logLik_grm(u[0], theta, params)', function () {
      // expected values from R equivalent: `catIrt::logLik.grm(u, theta, params)`
      const expected = [-7.466321, -12.8073];

      const mResp = catirtlib.MatrixFromArray([uresp_grm[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_logLik_grm(mResp, mTheta, mParams, catirtlib.LogLikType.MLE);

      assert.strictEqual(format(catirtlib.VectorToArray(res)), format(expected));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mTheta.delete();
      res.delete();
    });
  });

  describe('wasm_FI_brm:', function () {
    it('wasm_FI_brm(params, theta, "EXPECTED")', function () {
      // expected values from R equivalent: `catIrt::FI.brm(params, theta, type="expected")`
      const expected = {
        type: catirtlib.FIType.EXPECTED,
        item: [
          [0.4144132, 0.15081586, 0.1230584, 0.02053748, 0.02596604],
          [0.0150616, 0.04958082, 0.1924912, 0.43542257, 0.38347792]
        ],
        test: [0.734791, 1.076034],
        sem: [1.1665896, 0.9640221]
      };

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const mResp = new catirtlib.Matrix(0, 0);
      const res = catirtlib.wasm_FI_brm(mParams, mTheta, catirtlib.FIType.EXPECTED, mResp);

      assert.strictEqual(res.type, expected.type);
      assert.strictEqual(format(catirtlib.MatrixToArray(res.item)), format(expected.item));
      assert.strictEqual(format(catirtlib.VectorToArray(res.test)), format(expected.test));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      mResp.delete();
      res.item.delete();
      res.test.delete();
      res.sem.delete();
    });

    it('wasm_FI_brm(params, theta, "OBSERVED", resp)', function () {
      // expected values from R equivalent: `catIrt::FI.brm(params, theta, type="observed", resp=resp)`
      const expected = {
        type: catirtlib.FIType.OBSERVED,
        item: [
          [0.38726367, -1.54763399, -0.5928689, 0.1181999, 0.09989038],
          [0.01713032,  0.05638416,  0.1907768, 0.5042907, 0.35705145]
        ],
        test: [-1.535149, 1.125633],
        sem: [NaN, 0.9425437]
      };

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const mResp = catirtlib.MatrixFromArray(uresp);
      const res = catirtlib.wasm_FI_brm(mParams, mTheta, catirtlib.FIType.OBSERVED, mResp);

      assert.strictEqual(res.type, expected.type);
      assert.strictEqual(format(catirtlib.MatrixToArray(res.item)), format(expected.item));
      assert.strictEqual(format(catirtlib.VectorToArray(res.test)), format(expected.test));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      mResp.delete();
      res.item.delete();
      res.test.delete();
      res.sem.delete();
    });
  });

  describe('wasm_FI_brm_modified_expected:', function () {
    it('wasm_FI_brm_modified_expected(params2, theta2, params1, theta1)', function () {
      // expected values from R equivalent: `catIrt::FI.brm(params, theta, type="expected", phase1_params=params, phase1_est_theta=theta)`
      const expected = {
        type: catirtlib.FIType.EXPECTED,
        item: [
          [1.054869e-01, 0.1249536068, 0.09824271, 0.01755472, 0.02175564],
          [9.518886e-05, 0.0002714249, 0.01107407, 0.05281401, 0.10045315]
        ],
        test: [0.3679936, 0.1647078],
        sem: [1.648465, 2.464012]
      };

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const res = catirtlib.wasm_FI_brm_modified_expected(mParams, mTheta, mParams, mTheta);

      assert.strictEqual(res.type, expected.type);
      assert.strictEqual(format(catirtlib.MatrixToArray(res.item)), format(expected.item));
      assert.strictEqual(format(catirtlib.VectorToArray(res.test)), format(expected.test));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      res.item.delete();
      res.test.delete();
      res.sem.delete();
    });
  });

  describe('wasm_FI_grm:', function () {
    it('wasm_FI_grm(params, theta, "EXPECTED")', function () {
      // expected values from R equivalent: `catIrt::FI.grm(params, theta, type="expected")`
      const expected = {
        type: catirtlib.FIType.EXPECTED,
        item: [
          [0.5979150, 0.5026771, 0.3045263, 0.1180620, 0.09919267],
          [0.2867264, 0.2444279, 0.3141072, 0.3126753, 0.26253014]
        ],
        test: [1.622373, 1.420467],
        sem: [0.7850994, 0.8390434]
      };

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const mResp = new catirtlib.Matrix(0, 0);
      const res = catirtlib.wasm_FI_grm(mParams, mTheta, catirtlib.FIType.EXPECTED, mResp);

      assert.strictEqual(res.type, expected.type);
      assert.strictEqual(format(catirtlib.MatrixToArray(res.item)), format(expected.item));
      assert.strictEqual(format(catirtlib.VectorToArray(res.test)), format(expected.test));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      mResp.delete();
      res.item.delete();
      res.test.delete();
      res.sem.delete();
    });

    it('wasm_FI_grm(params, theta, "OBSERVED", resp)', function () {
      // expected values from R equivalent: `catIrt::FI.grm(params, theta, type="observed", resp=resp)`
      const expected = {
        type: catirtlib.FIType.OBSERVED,
        item: [
          [0.4939227, 0.62417921, 0.3038985, 0.205088, 0.09989038],
          [0.3035435, 0.05638416, 0.3134121, 0.315370, 0.73490795]
        ],
        test: [1.726979, 1.723618],
        sem: [0.7609506, 0.7616922]
      };

      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mTheta = catirtlib.MatrixFromArray([theta]);
      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const res = catirtlib.wasm_FI_grm(mParams, mTheta, catirtlib.FIType.OBSERVED, mResp);

      assert.strictEqual(res.type, expected.type);
      assert.strictEqual(format(catirtlib.MatrixToArray(res.item)), format(expected.item));
      assert.strictEqual(format(catirtlib.VectorToArray(res.test)), format(expected.test));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mParams.delete();
      mTheta.delete();
      mResp.delete();
      res.item.delete();
      res.test.delete();
      res.sem.delete();
    });
  });

  describe('wasm_uniroot_lder1:', function () {
    it('wasm_uniroot_lder1(range, uresp[0], params, "WLE", "BRM")', function () {
      const expected = {
        root: 0.02317778,
        f_root: -1.406347e-05,
        iter: 9,
        estim_prec: 6.103516e-05
      };

      const mRange = catirtlib.MatrixFromArray([range]);
      const mResp = catirtlib.MatrixFromArray([uresp[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const res = catirtlib.wasm_uniroot_lder1(mRange, mResp, mParams, catirtlib.LderType.WLE, catirtlib.ModelType.BRM);

      assert.strictEqual(format(res.root), format(expected.root));
      assert.strictEqual(format(res.f_root), format(expected.f_root));
      assert.strictEqual(format(res.iter), format(expected.iter));
      assert.strictEqual(format(res.estim_prec), format(expected.estim_prec));

      // wasm heap cleanup
      mRange.delete();
      mResp.delete();
      mParams.delete();
    });

    it('wasm_uniroot_lder1(range, uresp[1], params, "WLE", "BRM")', function () {
      const expected = {
        root: -2.286811,
        f_root: 4.785281e-06,
        iter: 10,
        estim_prec: 6.103516e-05
      };

      const mRange = catirtlib.MatrixFromArray([range]);
      const mResp = catirtlib.MatrixFromArray([uresp[1]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const res = catirtlib.wasm_uniroot_lder1(mRange, mResp, mParams, catirtlib.LderType.WLE, catirtlib.ModelType.BRM);

      assert.strictEqual(format(res.root), format(expected.root));
      assert.strictEqual(format(res.f_root), format(expected.f_root));
      assert.strictEqual(format(res.iter), format(expected.iter));
      assert.strictEqual(format(res.estim_prec), format(expected.estim_prec));

      // wasm heap cleanup
      mRange.delete();
      mResp.delete();
      mParams.delete();
    });

    it('wasm_uniroot_lder1(range, uresp_grm[0], params, "WLE", "GRM")', function () {
      const expected = {
        root: -0.3175944,
        f_root: -6.413003e-06,
        iter: 7,
        estim_prec: 6.103516e-05
      };

      const mRange = catirtlib.MatrixFromArray([range]);
      const mResp = catirtlib.MatrixFromArray([uresp_grm[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const res = catirtlib.wasm_uniroot_lder1(mRange, mResp, mParams, catirtlib.LderType.WLE, catirtlib.ModelType.GRM);

      assert.strictEqual(format(res.root), format(expected.root));
      assert.strictEqual(format(res.f_root), format(expected.f_root));
      assert.strictEqual(format(res.iter), format(expected.iter));
      assert.strictEqual(format(res.estim_prec), format(expected.estim_prec));

      // wasm heap cleanup
      mRange.delete();
      mResp.delete();
      mParams.delete();
    });

    it('wasm_uniroot_lder1(range, uresp_grm[1], params, "WLE", "GRM")', function () {
      const expected = {
        root: -0.04421021,
        f_root: -7.230714e-06,
        iter: 6,
        estim_prec: 6.103516e-05
      };

      const mRange = catirtlib.MatrixFromArray([range]);
      const mResp = catirtlib.MatrixFromArray([uresp_grm[1]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const res = catirtlib.wasm_uniroot_lder1(mRange, mResp, mParams, catirtlib.LderType.WLE, catirtlib.ModelType.GRM);

      assert.strictEqual(format(res.root), format(expected.root));
      assert.strictEqual(format(res.f_root), format(expected.f_root));
      assert.strictEqual(format(res.iter), format(expected.iter));
      assert.strictEqual(format(res.estim_prec), format(expected.estim_prec));

      // wasm heap cleanup
      mRange.delete();
      mResp.delete();
      mParams.delete();
    });
  });

  describe('wasm_wleEst:', function () {
    it('wasm_wleEst(uresp[0], params, range, "BRM")', function () {
      const expected = {
        theta: [0.02317778],
        info: [3.341271],
        sem: [0.5543441]
      };

      const mResp = catirtlib.MatrixFromArray([uresp[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.BRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });

    it('wasm_wleEst(uresp[1], params, range, "BRM")', function () {
      const expected = {
        theta: [-2.28681109],
        info: [0.1233062],
        sem: [3.5023960]
      };

      const mResp = catirtlib.MatrixFromArray([uresp[1]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.BRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });

    it('wasm_wleEst(uresp, params, range, "BRM")', function () {
      const expected = {
        theta: [0.02317778, -2.28681109],
        info: [3.341271, 0.1233062],
        sem: [0.5543441, 3.5023960]
      };

      const mResp = catirtlib.MatrixFromArray(uresp);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.BRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });

    it('wasm_wleEst(uresp_grm[0], params, range, "GRM")', function () {
      const expected = {
        theta: [-0.3175944],
        info: [6.011785],
        sem: [0.4098758]
      };

      const mResp = catirtlib.MatrixFromArray([uresp_grm[0]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.GRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });

    it('wasm_wleEst(uresp_grm[1], params, range, "GRM")', function () {
      const expected = {
        theta: [-0.04421021],
        info: [5.352786],
        sem: [0.4322895]
      };

      const mResp = catirtlib.MatrixFromArray([uresp_grm[1]]);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.GRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });

    it('wasm_wleEst(uresp_grm, params, range, "GRM")', function () {
      const expected = {
        theta: [-0.3175944, -0.04421021],
        info: [6.011785, 5.352786],
        sem: [0.4098758, 0.4322895]
      };

      const mResp = catirtlib.MatrixFromArray(uresp_grm);
      const mParams = catirtlib.MatrixFromArray(itemparams);
      const mRange = catirtlib.MatrixFromArray([range]);
      const res = catirtlib.wasm_wleEst(mResp, mParams, mRange, catirtlib.ModelType.GRM);

      assert.strictEqual(format(catirtlib.VectorToArray(res.theta)), format(expected.theta));
      assert.strictEqual(format(catirtlib.VectorToArray(res.info)), format(expected.info));
      assert.strictEqual(format(catirtlib.VectorToArray(res.sem)), format(expected.sem));

      // wasm heap cleanup
      mResp.delete();
      mParams.delete();
      mRange.delete();
      res.theta.delete();
      res.info.delete();
      res.sem.delete();
    });
  });
});
