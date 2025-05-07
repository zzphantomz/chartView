import React, { useEffect, useRef } from "react";

import { widget } from "./charting_library";
import Datafeed from "./datafeed_custom";
import queryString from 'query-string';
let interval;
const TVChartContainer = () => {
  const chartContainerRef = useRef();
  let vars = {};
  const parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  const href = window.location.href;
  const data = queryString.parse(href)
  const id = data.id;
  const theme = data.theme?data.theme:'dark';

  const setReady = () =>{
    window?.ReactNativeWebView?.postMessage(true);
    clearInterval(interval)
  }

  useEffect(() => {
    const widgetOptions = {
      symbol: id,
      datafeed: Datafeed,
      container: chartContainerRef.current,
      library_path: "/charting_library/",

      locale: "en",
      disabled_features: [
        'edit_buttons_in_legend',
        'format_buttons_in_legend',
        'border_around_the_chart',
        'scales_context_menu',
        'header_widget',
        'header_chart_type',
        'header_compare',
        'header_indicators',
        'use_localstorage_for_settings',
        'use_localstorage_for_settings',
        'left_toolbar',
        'header_screenshot',
        'legend_context_menu',
        'edit_buttons_in_legend',
        'context_menus',
        'border_around_the_chart',
        'header_indicators',
        'header_symbol_search',
        'header_chart_type',
        'header_symbol_list',
        'header_compare',
        'header_chart_type',
        'header_settings',
      ],
      enabled_features: [],
      charts_storage_url: "https://saveload.tradingview.com",
      charts_storage_api_version: "1.1",

      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,

      studies_overrides: {},
      supports_marks: false,
      supports_timescale_marks: false,
      theme: theme,



      overrides: {
        "mainSeriesProperties.statusViewStyle.showInterval": true,
        "mainSeriesProperties.statusViewStyle.symbolTextSource": "ticker",
        "mainSeriesProperties.candleStyle.upColor": '#39D061',
        "mainSeriesProperties.candleStyle.downColor": '#E03B29',
        "mainSeriesProperties.candleStyle.borderUpColor": '#39D061',
        "mainSeriesProperties.candleStyle.borderDownColor": '#E03B29',
        "mainSeriesProperties.candleStyle.wickUpColor": '#39D061',

      },
    };


    const tvWidget = new widget(widgetOptions);


    interval = setInterval(function () {

      if (tvWidget._ready) {
        clearInterval(interval)
          setReady();
      }
    }, 500)

    // tvWidget.chart().getSeries().setChartStyleProperties(1,{
    //   upColor: '#10F9E0',
    //   downColor: '#1029F9',
    //   borderUpColor: '#10F9E0',
    //   borderDownColor: '#1029F9'
    // })


    return () => {
      tvWidget.remove();
    };
  }, []);



  return <div ref={chartContainerRef} style={{ height: '100vh', backgroundColor: 'black' }}/>;
};

export default TVChartContainer;
