/* Pricing Form */
jQuery(document).ready(function($){

  console.log('[pricing.js] loaded. formId = ', wpvars.formId);
  var formId = wpvars.formId;

  let quote = {
    'services': {
      'site_visit': {
        'selected': false,
        'quantity': 1,
        'label': 'Site Visit'
      },
      'affiliate_partner': {
        'selected': false,
        'label': 'Affiliate Partner',
        'partner_type': 'Silver'
      },
      'group_coaching': {
        'selected': false,
        'label': 'Group Coaching'
      },
      'one_on_one_coaching': {
        'selected': false,
        'quantity': 0,
        'label': 'One-on-One Coaching'
      },
      'marketing': {
        'selected': false,
        'label': 'Marketing',
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
    calculatePrice();
  });

  $('input.quantity').change(function(){
    quote.services.site_visit.quantity = this.value;
    calculatePrice();
  });

  $('input[name="partner_type"]').change(function(){
    quote.services.affiliate_partner.partner_type = this.value;
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

  // Toggle the text of the submit button
  $('input[name="input_7"]').change(function(){
    var value = $(this).val();
    var submitButton = $('.smco-pricing-form input[type="submit"]');
    if('I\'d like to discuss my quote.' === value ){
      submitButton.val('Discuss Your Quote');
    } else {
      submitButton.val('Sign Up');
    }
  });

  // Listen for clicks on Elementor Price Table button
  $('.elementor-widget-price-table').on('click', '.elementor-price-table__button', function(){
    var partner_type = $(this).closest('.elementor-widget-price-table').attr('data-partner-type');
    if( typeof partner_type === 'undefined' ){
      console.log('🔔 Add a `data-partner-type` attribute to this Price Table Widget in Elementor to select an Affiliate Partner Plan Type in the Pricing Form on this page');
    } else {
      // Pre-select the partner type in the Pricing Form:
      console.log(`🔔 partner_type = ${partner_type}`);
      $('#affiliate_partner').prop('checked',true);

      // Show the Bronze, Silver, Gold options
      if( ! $('#affiliate_partner_options').is(':visible') )
        $('#affiliate_partner_options').slideDown();

      // Check the checkbox
      $('#affiliate_' + partner_type ).prop('checked',true);

      // Update the quote object
      quote.services.affiliate_partner.selected = true;
      quote.services.affiliate_partner.partner_type = partner_type;

      calculatePrice();
    }
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
      const site_visit_prices = [0,1800,3000,4500];
      price.onetime.push(site_visit_prices[quantity]);
    }

    // Affiliate Partner
    if( quote.services.affiliate_partner.selected ){
      partner_type = quote.services.affiliate_partner.partner_type;
      const affiliate_partner_prices = {
        'Bronze': 300,
        'Silver': 400,
        'Gold': 500
      };
      //console.log(`🔔 partner_type = ${partner_type}`);
      price.monthly.push( affiliate_partner_prices[partner_type] );
    }

    // Group Coaching
    if( quote.services.group_coaching.selected ){
      price.monthly.push(300);
    }

    // One-on-One Coaching
    if( quote.services.one_on_one_coaching.selected ){
      quantity = quote.services.one_on_one_coaching.quantity;
      const one_on_one_coaching_prices = [0,1800,1800,2400,3000,3600,4500,4800,5400,6000,6600];
      price.monthly.push(one_on_one_coaching_prices[quantity]);
      const one_on_one_coaching_setup_prices = [0,250,375,500,625,750,875,1000,1125,1250,1375];
      price.onetime.push(one_on_one_coaching_setup_prices[quantity]);
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

    const initialBankDraft = (totalOnetimePrice/2)+totalMonthlyPrice;
    const formattedInitialBankDraft = formatMoney(initialBankDraft,0);
    console.log('[pricing.js] formattedInitialBankDraft = ', formattedInitialBankDraft );

    const remainingBankDraft = (totalOnetimePrice/2);
    const formattedRemainingBankDraft = formatMoney(remainingBankDraft,0);
    console.log('[pricing.js] formattedRemainingBankDraft = ', formattedRemainingBankDraft );

    // Activate OneTime Pricing fields?
    if(0 < totalOnetimePrice){
      $('.one-time-fees').removeClass('disabled');
    } else {
      $('.one-time-fees').addClass('disabled');
    }

    // Activate Monthly Pricing fields?
    if(0 < totalMonthlyPrice){
      $('.monthly-fees').removeClass('disabled');
    } else {
      $('.monthly-fees').addClass('disabled');
    }

    if( 0 < initialBankDraft ){
      $('.initial-bank-draft').removeClass('disabled');
    } else {
      $('.initial-bank-draft').addClass('disabled');
    }

    if( 0 < remainingBankDraft ){
      $('.remaining-bank-draft').removeClass('disabled');
    } else {
      $('.remaining-bank-draft').addClass('disabled');
    }

    // Update pricing display fields
    $('.one-time-fees').html(formattedOnetimePrice);
    $('.monthly-fees').html(formattedMonthlyPrice);
    $('.initial-bank-draft').html(formattedInitialBankDraft);
    $('.remaining-bank-draft').html(formattedRemainingBankDraft);

    // Update hidden fields

    // Add description text for Selected Services
    var selectedServicesDesc = getSelectedServicesDescription();
    console.log('selectedServicesDesc = ', selectedServicesDesc);
    $('.smco-pricing-form #input_' + formId + '_1').val(selectedServicesDesc);

    // Set number of locations
    var noOfLocations = getNoOfLocations();
    console.log('noOfLocations = ', noOfLocations);
    $('.smco-pricing-form #input_' + formId + '_2').val(noOfLocations);

    // Set One-Time/Setup Fee
    $('.smco-pricing-form #input_' + formId + '_19').val(formattedOnetimePrice);

    // Set Recurring Fee
    $('.smco-pricing-form #input_' + formId + '_21').val(formattedMonthlyPrice);

    // Set Today's Bank Draft
    $('.smco-pricing-form #input_' + formId + '_22').val(formattedInitialBankDraft);

    // Set Remaining Bank Draft
    $('.smco-pricing-form #input_' + formId + '_23').val(formattedRemainingBankDraft);
  }

  function getNoOfLocations(){
    return quote.services.one_on_one_coaching.quantity;
  }

  function getSelectedServicesDescription(){
    var selected_services = '';
    var services = quote.services;
    var counter = 0
    for( var key in services ){
      if( true === services[key].selected ){
        var label = services[key].label
        switch(key){
          case 'site_visit':
            label+= ' (' + services[key].quantity + ' day';
            if( 1 < services[key].quantity )
              label+= 's';
            label+= ')';
            break;

          case 'one_on_one_coaching':
            if( 0 < services[key].quantity ){
              label+= ' (' + services[key].quantity + ' location';
              if( 1 < services[key].quantity )
                label+= 's';
              label+= ')';
            }
            break;

          case 'marketing':
            var modules = services[key].modules;
            label+= ' ('
            var mod_counter = 0;
            for( var module in modules ){
              if( true === modules[module] ){
                if( 0 < mod_counter )
                  label+= ', ';
                label+= module;
                mod_counter++;
              }
            }
            label+= ')'
            break;

          default:
            // nothing
        }


        if( 0 < counter )
          selected_services+= ', ';
        selected_services+= label;
        counter++;
      }
    }
    return selected_services;
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