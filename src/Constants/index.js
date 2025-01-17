
const AppName = 'Insightica';
const DesignedBy = 'EWhizard';
const ButtonStyle = 'm-auto w-cover font-semibold border-solid border-2 border-blue-600 px-10 py-2 hover:text-white hover:bg-blue-600 rounded-[30px]';

const footerTitle = `@2024 ${AppName}. Alrights Reserved`;


const metrics = [
  "Average Daily Return",
  "Loss Trades",
  "Maximum Draw Down",
  "Profitable Trades",
  "Sharpe Ratio",
  "Total Return",
  "Winning Percentage"
];

const metricsMemo = {
  "Average Daily Return":"avg_daily_return",
  "Loss Trades":"loss_trades",
  "Maximum Draw Down":"max_drawdown",
  "Profitable Trades":"profitable_trades",
  "Sharpe Ratio":"sharpe_ratio",
  "Total Return":"total_return",
  "Winning Percentage":"winning_percentage"
}

const pricing_values = [
  {
    title: "Single Evaluator",
    quotes: "Start Small. Think Big. Analyze with Confidence.",
    link: "/singleeval",
    description:
      "Empower your trading decisions with precision-driven single-condition insights.",
    keyHighlights: [
      {
        title: "Performance Matrix",
        description:
          "Visualize performance across stocks with pinpoint accuracy."
      },
      {
        title: "Metric Wheel",
        description: "Assess multi-metric performance for targeted conditions."
      },
      {
        title: "Trend Chart",
        description:
          "Decode trends over time or across multiple assets effortlessly."
      }
    ],
    whyShouldIUse: [
      "New to indicators? This is your launchpad.",
      "Craft smarter strategies backed by data."
    ],
    takeAways: [
      "Clear condition-to-stock performance metrics.",
      "Identify early trends and actionable insights.",
      "Simplify decision-making with powerful visuals."
    ]
  },
  {
    title: "Double Evaluator",
    quotes: "Pair Smart. Perform Better. Maximize Your Strategy.",
    description:
      "Redefine your trading approach by uncovering the best-performing indicator pairs.",
    keyHighlights: [
      {
        title: "Performance Matrix",
        description:
          "Fix one condition and discover how others amplify performance."
      },
      {
        title: "Metric Wheel",
        description: "Compare condition-pair performance across key metrics."
      },
      {
        title: "Trend Chart",
        description: "Track paired indicators over time for robust insights."
      },
      {
        title: "Correlation Arc",
        description:
          "Visualize synergies with the thickness of connection bands—spot the strongest pairs at a glance."
      }
    ],
    whyShouldIUse: [
      "Identify complementary indicators to refine strategies.",
      "Optimize pair-based performance for sustained gains."
    ],
    takeAways: [
      "Uncover high-impact condition pairs that boost your strategy.",
      "Visualize data-driven synergies like never before.",
      " Achieve smarter optimization with advanced tools."
    ]
  },
  {
    title: "Triple Evaluator",
    quotes: "Think Bigger. Go Deeper. Achieve Market Mastery.",
    description:
      "Unlock institutional-grade insights by analyzing triplets of conditions for ultimate precision.",
    keyHighlights: [
      {
        title: "Performance Matrix",
        description:
          "Assess triplet performance across multiple stocks for strategic depth."
      },
      {
        title: "Metric Wheel",
        description: "Visualize six-metric outcomes for complex combinations."
      },
      {
        title: "Trend Chart",
        description: "Measure triplet impacts over time and across assets."
      },
      {
        title: "Correlation Arc",
        description: "Measure triplet impacts over time and across assets."
      }
    ],
    whyShouldIUse: [
      "Build large-scale, multi-condition strategies.",
      "Optimize deep, multi-variable analytics for better risk-reward tradeoffs."
    ],
    takeAways: [
      "Model complex market interactions with precision.",
      "Build smarter, large-scale strategies for real impact.",
      "Gain a competitive edge with actionable, high-value insights."
    ]
  }
];



const menuLinks = [
  {
    title: "Trading Essentials",
    route: "/tradingessentials"
  },
  {
    title: "Terms and Conditions",
    route: "/tac"
  },
  {
    title: "Privacy Policy",
    route: "/privacy"
  },
  {
    title: "Invest in Us",
    route: "/invest"
  }
];

const navLinks = [
  {
    title: "Home",
    route: "/dashboard",
    link: "home"
  },
  {
    title: "Products",
    route: "/dashboard",
    link: "tools"
  },
  {
    title: "Testimonials",
    route: "/dashboard",
    link: "testimonials"
  },
  {
    title: "FAQ",
    route: "/dashboard",
    link: "faq"
  },
  {
    title: "Support",
    route: "/support",
    link: "contact"
  },
  {
    title: "About Us",
    route: "/about",
    link: "contact"
  }
];



const tickers = [
  "RBLBANK.NS",
  "SBILIFE.NS",
  "CROMPTON.NS",
  "NMDC.NS",
  "FSL.NS",
  "BHARATFORG.NS",
  "LTTS.NS",
  "SAIL.NS",
  "LICHSGFIN.NS",
  "BOSCHLTD.NS",
  "PETRONET.NS",
  "ADANIPORTS.NS",
  "DCBBANK.NS",
  "HDFCBANK.NS",
  "COROMANDEL.NS",
  "IGL.NS",
  "GUJGASLTD.NS",
  "JUBLINGREA.NS",
  "VEDL.NS",
  "MRPL.NS",
  "DIVISLAB.NS",
  "CUMMINSIND.NS",
  "TATACONSUM.NS",
  "OFSS.NS",
  "TVSMOTOR.NS",
  "CCL.NS",
  "SHREECEM.NS",
  "CHOLAFIN.NS",
  "NATIONALUM.NS",
  "RELCAPITAL.NS",
  "ALKEM.NS",
  "BATAINDIA.NS",
  "AMBUJACEM.NS",
  "PERSISTENT.NS",
  "CEATLTD.NS",
  "JSL.NS",
  "M&MFIN.NS",
  "JUBLFOOD.NS",
  "HEROMOTOCO.NS",
  "MANAPPURAM.NS",
  "AIAENG.NS",
  "NESTLEIND.NS",
  "LUPIN.NS",
  "AUBANK.NS",
  "HINDPETRO.NS",
  "CADILAHC.NS",
  "RECLTD.NS",
  "FEDERALBNK.NS",
  "MARICO.NS",
  "INDUSINDBK.NS",
  "GICRE.NS",
  "TATAMOTORS.NS",
  "GODREJCP.NS",
  "HINDUNILVR.NS",
  "GMRINFRA.NS",
  "BAJAJ-AUTO.NS",
  "YESBANK.NS",
  "L&TFH.NS",
  "ONGC.NS",
  "IRB.NS",
  "ALOKINDS.NS",
  "ESCORTS.NS",
  "BERGEPAINT.NS",
  "BAJFINANCE.NS",
  "TORNTPHARM.NS",
  "KSCL.NS",
  "BBTC.NS",
  "ULTRACEMCO.NS",
  "HINDALCO.NS",
  "ABBOTINDIA.NS",
  "GODREJIND.NS",
  "CASTROLIND.NS",
  "TATAPOWER.NS",
  "AJANTAPHARM.NS",
  "BLUEDART.NS",
  "BHARTIARTL.NS",
  "ASIANPAINT.NS",
  "PFC.NS",
  "SRF.NS",
  "CUB.NS",
  "MUTHOOTFIN.NS",
  "IDFCFIRSTB.NS",
  "APTECHT.NS",
  "PNB.NS",
  "SYNGENE.NS",
  "AUROPHARMA.NS",
  "ARVIND.NS",
  "PFIZER.NS",
  "NHPC.NS",
  "SUNTV.NS",
  "VOLTAS.NS",
  "ICICIBANK.NS",
  "PTC.NS",
  "MFSL.NS",
  "CANFINHOME.NS",
  "APLLTD.NS",
  "M&M.NS",
  "INFY.NS",
  "TORNTPOWER.NS",
  "DEEPAKNTR.NS",
  "COLPAL.NS",
  "BEL.NS",
  "JSWSTEEL.NS",
  "RELIANCE.NS",
  "SBIN.NS",
  "HDFC.NS",
  "AJANTPHARM.NS",
  "DLF.NS",
  "SOBHA.NS",
  "WOCKPHARMA.NS",
  "GLAXO.NS",
  "MOTHERSUMI.NS",
  "ADANIPOWER.NS",
  "TATAELXSI.NS",
  "BAJAJELEC.NS",
  "KEC.NS",
  "MARUTI.NS",
  "COFORGE.NS",
  "IOC.NS",
  "KOTAKBANK.NS",
  "BOMDYEING.NS",
  "ERIS.NS",
  "ASTRAZEN.NS",
  "VGUARD.NS",
  "SUNPHARMA.NS",
  "ZEEL.NS",
  "POWERGRID.NS",
  "RPOWER.NS",
  "EICHERMOT.NS",
  "KPITTECH.NS",
  "MRF.NS",
  "INDIGO.NS",
  "ITC.NS",
  "EMAMIREAL.NS",
  "EDELWEISS.NS",
  "COALINDIA.NS",
  "APOLLOHOSP.NS",
  "ICICIGI.NS",
  "ACC.NS",
  "GLENMARK.NS",
  "EMAMILTD.NS",
  "FORTIS.NS",
  "TITAN.NS",
  "HDFCAMC.NS",
  "ATUL.NS",
  "TATACHEM.NS",
  "GRASIM.NS",
  "TECHM.NS",
  "MPHASIS.NS",
  "TATASPONGE.NS",
  "TATASTEEL.NS",
  "BRITANNIA.NS",
  "SBICARD.NS",
  "APOLLOTYRE.NS",
  "ASHOKLEY.NS",
  "MCX.NS",
  "PNBHOUSING.NS",
  "GAIL.NS",
  "RELINFRA.NS",
  "CGPOWER.NS",
  "BALKRISIND.NS",
  "TCS.NS",
  "IFCI.NS",
  "ADANITRANS.NS",
  "REPCOHOME.NS",
  "WIPRO.NS",
  "CONCOR.NS",
  "JINDALSTEL.NS",
  "IBULHSGFIN.NS",
  "INDIAMART.NS",
  "TATAMTRDVR.NS",
  "BPCL.NS",
  "ADANIGREEN.NS",
  "DRREDDY.NS",
  "HCLTECH.NS",
  "CIPLA.NS",
  "TTML.NS",
  "UPL.NS",
  "HDFCLIFE.NS",
  "NBCC.NS",
  "IRCTC.NS",
  "VINYLINDIA.NS",
  "UBL.NS",
  "ICICIPRULI.NS",
  "BHEL.NS",
  "BIOCON.NS",
  "BANKBARODA.NS",
  "LT.NS",
  "EXIDEIND.NS",
  "RAMCOCEM.NS",
  "PAGEIND.NS",
  "DHFL.NS",
  "GRAPHITE.NS",
  "RALLIS.NS",
  "THERMAX.NS",
  "GODFRYPHLP.NS",
  "BOSCHLTD.NS",
  "SCHAEFFLER.NS",
  "VIPIND.NS",
  "RAJESHEXPO.NS",
  "FRETAIL.NS",
  "FINCABLES.NS",
  "SRTRANSFIN.NS",
  "KANSAINER.NS",
  "SHK.NS",
  "ENDURANCE.NS",
  "VGUARD.NS",
  "APARINDS.NS",
  "VAIBHAVGBL.NS",
  "SYMPHONY.NS",
  "HEG.NS",
  "BATAINDIA.NS",
  "MOIL.NS",
  "BASF.NS",
  "TV18BRDCST.NS",
  "COROMANDEL.NS",
  "BALKRISHNA.NS",
  "JAGRAN.NS",
  "HONAUT.NS",
  "LAOPALA.NS",
  "POLYCAB.NS",
  "SUVENPHAR.NS",
  "PERSISTENT.NS",
  "CHENNPETRO.NS",
  "CESC.NS",
  "MAHINDCIE.NS",
  "NESCO.NS",
  "WESTLIFE.NS",
  "SUDARSCHEM.NS",
  "SKFINDIA.NS",
  "MASTEK.NS",
  "TANLA.NS",
  "JKCEMENT.NS",
  "TIMKEN.NS",
  "NAUKRI.NS",
  "NESTLEIND.NS",
  "MAHSEAMLES.NS",
  "PGHH.NS",
  "LALPATHLAB.NS",
  "DIXON.NS",
  "ASTRAZEN.NS",
  "MAHSCOOTER.NS",
  "TATACOMM.NS",
  "QUESS.NS",
  "FLUOROCHEM.NS",
  "GILLETTE.NS",
  "PRSMJOHNSN.NS",
  "JCHAC.NS",
  "BALAMINES.NS",
  "PIIND.NS",
  "GUJALKALI.NS",
  "SONATSOFTW.NS",
  "NAVNETEDUL.NS",
  "HAWKINCOOK.NS",
  "SOLARINDS.NS",
  "JUBLINGREA.NS",
  "CRISIL.NS",
  "ECLERX.NS",
  "MINDACORP.NS",
  "SCHAND.NS",
  "ORIENTELEC.NS",
  "GRINDWELL.NS",
  "SIS.NS",
  "WHIRLPOOL.NS",
  "HEIDELBERG.NS",
  "HSCL.NS",
  "TASTYBITE.NS",
  "VAKRANGEE.NS",
  "WABAG.NS",
  "NIITLTD.NS",
  "TEAMLEASE.NS",
  "SANOFI.NS",
  "ELGIEQUIP.NS",
  "GEPIL.NS",
  "REGENCERAM.NS",
  "CHOLAHLDNG.NS",
  "ROSSARI.NS",
  "IFBIND.NS",
  "HINDZINC.NS",
  "LINDEINDIA.NS",
  "INFIBEAM.NS",
  "FINPIPE.NS",
  "ZENSARTECH.NS",
  "SHOPERSTOP.NS",
  "MAYURUNIQ.NS",
  "EROSMEDIA.NS",
  "UFLEX.NS",
  "MIDHANI.NS",
  "SCHNEIDER.NS",
  "BEML.NS",
  "VSTTILLERS.NS",
  "SHRIRAMCIT.NS",
  "TATAINVEST.NS",
  "MCX.NS",
  "WABCOINDIA.NS",
  "JYOTHYLAB.NS",
  "MAZDOCK.NS",
  "TATAMETALI.NS",
  "FDC.NS",
  "GABRIEL.NS",
  "RITES.NS",
  "FAIRCHEM.NS",
  "RANEHOLDIN.NS",
  "ORIENTREF.NS",
  "TATAELXSI.NS",
  "JUSTDIAL.NS",
  "ATFL.NS",
  "CERA.NS",
  "AMBER.NS",
  "EIDPARRY.NS",
  "RAJRATAN.NS",
  "JSWHL.NS",
  "GARFIBRES.NS",
  "ICRA.NS",
  "GOACARBON.NS",
  "COCHINSHIP.NS",
  "SFL.NS",
  "PRECAM.NS",
  "IFBAGRO.NS",
  "HIKAL.NS",
  "FIEMIND.NS",
  "DHANUKA.NS",
  "BBTC.NS",
  "TRIVENI.NS",
  "UTIAMC.NS",
  "CANFINHOME.NS",
  "ZUARI.NS",
  "HIKAL.NS",
  "CAPPL.NS",
  "RSYSTEMS.NS",
  "WOCKPHARMA.NS",
  "SUBROS.NS",
  "ORIENTBELL.NS",
  "EVERESTIND.NS",
  "SUPRAJIT.NS",
  "ARVINDFASN.NS",
  "STERTOOLS.NS",
  "SADBHAV.NS",
  "PSPPROJECT.NS",
  "JAICORPLTD.NS",
  "KPRMILL.NS",
  "GULFPETRO.NS",
  "VTL.NS",
  "KOLTEPATIL.NS",
  "IMFA.NS",
  "KIRLOSENG.NS",
  "STARPAPER.NS",
  "SWANENERGY.NS",
  "VISAKAIND.NS",
  "NILKAMAL.NS",
  "GANDHITUBE.NS",
  "SUPPETRO.NS",
  "IOLCP.NS",
  "TNPL.NS",
  "MMTC.NS",
  "THOMASCOOK.NS",
  "RUCHISOYA.NS",
  "SOMANYCERA.NS",
  "MANGALAM.NS",
  "KARDA.NS",
  "INSECTICID.NS",
  "STOVEKRAFT.NS",
  "SPICEJET.NS",
  "BRFL.NS"
].sort();


const AllConditions = [];
for (let i = 0; i < 32; i++) AllConditions.push(i + 1);



export{
    AppName,
    DesignedBy,
    ButtonStyle,
    tickers,
    navLinks,
    menuLinks,
	footerTitle,
  metrics,
  metricsMemo,
  pricing_values,
  AllConditions,
}