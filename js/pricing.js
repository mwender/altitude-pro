/* Pricing Form */
jQuery(document).ready(function($){

  console.log('[pricing.js] loaded.');

  let quote = {
    'services': {
      'site_visit': {
        'selected': false,
        'quantity': 1
      },
      'group_coaching': {
        'selected': false
      },
      'one_on_one_coaching': {
        'selected': false,
        'quantity': 0
      },
      'marketing': {
        'selected': false,
        'modules': {
          'donors': false,
          'community_partners': false,
          'volunteers': false,
          'customers': false
        }
      }
    }
  }
  calculatePrice();

  $('input.service').change(function(){
    quote.services[this.id].selected = this.checked;
    $('#' + this.id + '_options').slideToggle();
    //console.log('[pricing.js] quote =', quote);
    calculatePrice();
  });

  $('input.quantity').change(function(){
    quote.services.site_visit.quantity = this.value;
    calculatePrice();
  });

  $('select#locations').change(function(){
    console.log('[pricing.js] locations =', this.value);
    quote.services.one_on_one_coaching.quantity = this.value;
    calculatePrice();
  });

  $('input.marketing').change(function(){
    if( this.checked ){
      quote.services.marketing.modules[this.id] = true;
    } else {
      quote.services.marketing.modules[this.id] = false;
    }
    calculatePrice();
  });

  function calculatePrice(){
    console.log("\n----\n" + '[pricing.js] calculating price...', quote );
    const price = {
      onetime: [],
      monthly: []
    };
    let quantity = 0;

    // Site Visit
    if( quote.services.site_visit.selected ){
      quantity = quote.services.site_visit.quantity;
      const site_visit_prices = [0,1800,3000,4200];
      price.onetime.push(site_visit_prices[quantity]);
    }

    // Group Coaching
    if( quote.services.group_coaching.selected ){
      price.monthly.push(300);
    }

    // One-on-One Coaching
    if( quote.services.one_on_one_coaching.selected ){
      quantity = quote.services.one_on_one_coaching.quantity;
      const one_on_one_coaching_prices = [0,1800,1800,2400,3000,3600,4200,4800,5400,6000,6600];
      price.monthly.push(one_on_one_coaching_prices[quantity]);
    }

    // Marketing
    if( quote.services.marketing.selected ){
      const marketing_module_prices = [0,800,1600,2400,3200];

      let selectedMarketingModules = 0;
      if( quote.services.marketing.modules.community_partners )
        selectedMarketingModules++;
      if( quote.services.marketing.modules.customers )
        selectedMarketingModules++;
      if( quote.services.marketing.modules.donors )
        selectedMarketingModules++;
      if( quote.services.marketing.modules.volunteers )
        selectedMarketingModules++;

      price.monthly.push(marketing_module_prices[selectedMarketingModules]);
      price.onetime.push(marketing_module_prices[selectedMarketingModules]);
    }

    let totalMonthlyPrice = 0;
    for (let i = price.monthly.length - 1; i >= 0; i--) {
      totalMonthlyPrice = totalMonthlyPrice + price.monthly[i];
    }
    let totalOnetimePrice = 0;
    for (let i = price.onetime.length - 1; i >= 0; i--) {
      totalOnetimePrice = totalOnetimePrice + price.onetime[i];
    }

    const formattedMonthlyPrice = formatMoney(totalMonthlyPrice,0);
    console.log('[pricing.js] formattedMonthlyPrice = ', formattedMonthlyPrice );
    const formattedOnetimePrice = formatMoney(totalOnetimePrice,0);
    console.log('[pricing.js] formattedOnetimePrice = ', formattedOnetimePrice );

    if(0 < totalOnetimePrice){
      $('#pricing #onetime').removeClass('disabled');
      $('#one-time-fees').removeClass('disabled');
    } else {
      $('#pricing #onetime').addClass('disabled');
      $('#one-time-fees').addClass('disabled');
    }
    if(0 < totalMonthlyPrice){
      $('#pricing #monthly').removeClass('disabled');
      $('#recurring-fees').removeClass('disabled');

    } else {
      $('#pricing #monthly').addClass('disabled');
      $('#recurring-fees').addClass('disabled');
    }
    $('#pricing #onetime').html(formattedOnetimePrice);
    $('#pricing #monthly').html(formattedMonthlyPrice);
    $('#one-time-fees').html(formattedOnetimePrice);
    $('#recurring-fees').html(formattedMonthlyPrice);
  }

  /**
   * Returns a number formatted with commas
   *
   * @param      {number}              n       Number to be formated
   * @param      {number}              c       Number of digits after the decimal
   * @param      {string}              d       Decimal symbol
   * @param      {string}              t       Thousands separator
   * @return     {string}              Formatted number
   */
  function formatMoney(n, c, d, t) {
    var c = isNaN(c = Math.abs(c)) ? 2 : c,
      d = d == undefined ? "." : d,
      t = t == undefined ? "," : t,
      s = n < 0 ? "-" : "",
      i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
      j = (j = i.length) > 3 ? j % 3 : 0;

    return '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  };

  /*
  $('form.pure-form').on( 'click', 'label[for="site-visit"]', function(e){
    console.log('site-visit label clicked.');
    $('#site-visit-days').slideToggle();
    e.preventDefault();
  });
  */

});