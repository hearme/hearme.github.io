function SignupForm(element) {
  'use strict';
  this.element_ = element;
  this.init();
}

SignupForm.prototype.init = function() {
  'use strict';
  this.boundHandleSubmit = this.handleSubmit.bind(this);
  this.element_.addEventListener('submit', this.boundHandleSubmit)
};

SignupForm.prototype.handleSubmit = function(event) {
  var url = this.element_.getAttribute('action');
  var data = { EMAIL: this.element_.elements['email'].value }
  console.log('submit to ' + url, data);
  event.preventDefault();
  $.ajax({
    type: 'GET',
    url: url,
    data: data,
    cache: false,
    dataType: 'jsonp',
    jsonp: 'c', // trigger MailChimp to return a JSONP response
    contentType: 'application/json; charset=utf-8',
    error: function (error) {
      // According to jquery docs, this is never called for cross-domain JSONP requests
    },
    success: function(data){
      var message;
      if (data.result !== 'success') {
        message = data.msg || 'Sorry. Unable to subscribe. Please try again later.';
        $('.header__form-msg').html(message).show('slow');
      } else {
        message = 'Thank you!<br>You must confirm the subscription in your inbox.';
        $('.header__form-msg').html(message).show('slow');
      }
    }
  });
};

SignupForm.prototype.mdlDowngrade_ = function() {
  'use strict';
  this.element_.removeEventListener('click', this.boundHandleSubmit);
};

$(function() {
  console.log('register signup component');
  componentHandler.register({
    constructor: SignupForm,
    classAsString: 'Signup',
    cssClass: 'js-signup'
  });
});
