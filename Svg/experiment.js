  // LICENCE -----------------------------------------------------------------------------
  //
  // Copyright 2018 - Cédric Batailler
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this
  // software and associated documentation files (the "Software"), to deal in the Software
  // without restriction, including without limitation the rights to use, copy, modify,
  // merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  // permit persons to whom the Software is furnished to do so, subject to the following
  // conditions:
  //
  // The above copyright notice and this permission notice shall be included in all copies
  // or substantial portions of the Software.
  //
  // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  // INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  // PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  // HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
  // CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
  // OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  //
  // OVERVIEW -----------------------------------------------------------------------------
  //
  // TODO:
  //
  // safari exclusion ---------------------------------------------------------------------
  var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  var is_ie = /*@cc_on!@*/false || !!document.documentMode;

  var is_compatible = !(is_safari || is_ie);


  if(!is_compatible) {


      var exclusion = {
          type: "html-keyboard-response",
          stimulus:
          "<p>Unfortunately, this study is not compatible with your " +
          "browser.</p>" +
          "<p>Please reopen this experiment from a supported browser (like " +
          "Chrome or Firefox).</p>",
          choices: jsPsych.NO_KEYS
      };

      var timeline_exclusion = [];

      timeline_exclusion.push(exclusion);
      jsPsych.init({timeline: timeline_safari});

  }
  // firebase initialization ---------------------------------------------------------------
  var firebase_config = {
    apiKey: "AIzaSyAPTEPrT8V9T1-GouWXnW6jknK3brmagJs",
    databaseURL: "https://postdocgent.firebaseio.com/"
  };

  firebase.initializeApp(firebase_config);
  var database = firebase.database();
  var session_id  = jsPsych.randomization.randomID();

  // connection status ---------------------------------------------------------------------
  // This section ensure that we don't lose data. Anytime the 
  // client is disconnected, an alert appears onscreen
  var connectedRef = firebase.database().ref(".info/connected");
  var connection   = firebase.database().ref("connection/" + session_id + "/")
  var dialog = undefined;
  var first_connection = true;

  connectedRef.on("value", function(snap) {
    if (snap.val() === true) {
      connection
        .push()
        .set({status: "connection",
              timestamp: firebase.database.ServerValue.TIMESTAMP})

      connection
        .push()
        .onDisconnect()
        .set({status: "disconnection",
              timestamp: firebase.database.ServerValue.TIMESTAMP})

    if(!first_connection) {
      dialog.modal('hide');
    }
    first_connection = false;
    } else {
      if(!first_connection) {
      dialog = bootbox.dialog({
          title: 'Connection lost',
          message: '<p><i class="fa fa-spin fa-spinner"></i> Please wait while we try to reconnect.</p>',
          closeButton: false
          });
    }
    }
  });

// Global variables:
var approach_key  = "E";
var avoidance_key = "C";

// do something in the background
   // cursor helper functions -------------------------------------------------------------
  var hide_cursor = function() {
     document.querySelector('head').insertAdjacentHTML('beforeend', '<style id="cursor-toggle"> html { cursor: none; } </style>');
  }
  var show_cursor = function() {
     document.querySelector('#cursor-toggle').remove();
  }

  var hiding_cursor = {
      type: 'call-function',
      func: hide_cursor
  }

  var showing_cursor = {
      type: 'call-function',
      func: show_cursor
  }

  // Variable input -----------------------------------------------------------------------
  // Variable used to define experimental condition.

  var vaast_cond_block_1 = jsPsych.randomization.sampleWithoutReplacement(["approach_words_pos", "approach_words_neg"], 1)[0];

   if (vaast_cond_block_1 == "approach_words_pos") {
     vaast_cond_block_2 = "approach_words_neg";
   } else if (vaast_cond_block_1 == "approach_words_neg") {
     vaast_cond_block_2 = "approach_words_pos";
   }

  // prolific variables
  var prolific_id = jsPsych.data.getURLVariable('prolific_id');
  if(prolific_id == null) {prolific_id = "999";}

  // counter variables
  var vaast_trial_n    = 1;
  var browser_events_n = 1;

  // VAAST --------------------------------------------------------------------------------
  // VAAST variables ----------------------------------------------------------------------
  var approach_pos_1 = undefined;
  var approach_neg_1 = undefined;
  var approach_pos_2 = undefined;
  var approach_neg_2 = undefined;
  var approach_pos_3 = undefined;
  var approach_neg_3 = undefined;
  var approach_pos_4 = undefined;
  var approach_neg_4 = undefined;

  var stim_to_approach_1 = undefined;
  var stim_to_approach_2 = undefined;
  var stim_to_approach_3 = undefined;
  var stim_to_approach_4 = undefined;
  var stim_to_avoid_1    = undefined;
  var stim_to_avoid_2    = undefined;
  var stim_to_avoid_3    = undefined;
  var stim_to_avoid_4    = undefined;

  switch(vaast_cond_block_1) {
    case "approach_words_pos":
      approach_pos_1 = "approach";
      approach_neg_1 = "avoidance";
      stim_to_approach_1 = "positive words";
      stim_to_avoid_1 = "negative words";
      break;

    case "approach_words_neg":
      approach_pos_1 = "avoidance";
      approach_neg_1 = "approach";
      stim_to_approach_1 = "negative words";
      stim_to_avoid_1 = "positive words";
      break;
  }

  switch(vaast_cond_block_2) {
  case "approach_words_pos":
      approach_pos_2 = "approach";
      approach_neg_2 = "avoidance";
      stim_to_approach_2 = "positive words";
      stim_to_avoid_2 = "negative words";
      break;

    case "approach_words_neg":
      approach_pos_2 = "avoidance";
      approach_neg_2 = "approach";
      stim_to_approach_2 = "negative words";
      stim_to_avoid_2 = "positive words";
      break;
  }


  // vaast background images --------------------------------------------------------------
  /*
  var background = [
    "background/2.jpg",
    "background/4.jpg",
    "background/6.jpg"
  ];
*/
  var background_env_eco = [
    "background/env_eco/2.jpg",
    "background/env_eco/4.jpg",
    "background/env_eco/6.jpg"
  ];

  var background_fv_eco = [
    "background/fv_eco/2.jpg",
    "background/fv_eco/4.jpg",
    "background/fv_eco/6.jpg"
  ];

 var background = jsPsych.randomization.sampleWithoutReplacement([background_env_eco, background_fv_eco], 1)[0];

  // VAAST stimuli ------------------------------------------------------------------------
  var vaast_stim_training_block_1_words = [
    {stimulus: 'apple',     category: "approach_words_pos", movement: approach_pos_1},
    {stimulus: 'beach',     category: "approach_words_pos", movement: approach_pos_1},
    {stimulus: 'bed',       category: "approach_words_pos", movement: approach_pos_1},
    {stimulus: 'cake',      category: "approach_words_pos", movement: approach_pos_1},
    {stimulus: 'chocolate', category: "approach_words_pos", movement: approach_pos_1},
    {stimulus: 'acne',      category: "approach_words_neg", movement: approach_neg_1},
    {stimulus: 'blood',     category: "approach_words_neg", movement: approach_neg_1},
    {stimulus: 'cockroach', category: "approach_words_neg", movement: approach_neg_1},
    {stimulus: 'coffin',    category: "approach_words_neg", movement: approach_neg_1},
    {stimulus: 'corpse',    category: "approach_words_neg", movement: approach_neg_1},
  ];
  
  var vaast_stim_block_1_words = [
    {stimulus: 'baby',       category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'beach',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'birthday',   category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'gift',       category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'happiness',  category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'health',     category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'holidays',   category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'hug',        category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'humor',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'joy',        category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'laugh',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'party',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'passion',    category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'peace',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'pleasure',   category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'relax',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'share',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'smile',      category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'sun',        category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'triumph',    category: "approach_words_pos",  movement: approach_pos_1},
    {stimulus: 'accident',   category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'attack',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'bomb',       category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'cancer',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'coffin',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'danger',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'dead',       category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'death',      category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'disease',    category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'divorce',    category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'failure',    category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'lost',       category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'misery',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'murder',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'pain',       category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'poison',     category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'suicide',    category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'tomb',       category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'torture',    category: "approach_words_neg",  movement: approach_neg_1},
    {stimulus: 'war',        category: "approach_words_neg",  movement: approach_neg_1},
  ];

  var vaast_stim_training_block_2_words = [
    {stimulus: 'apple',     category: "approach_words_pos", movement: approach_pos_2},
    {stimulus: 'beach',     category: "approach_words_pos", movement: approach_pos_2},
    {stimulus: 'bed',       category: "approach_words_pos", movement: approach_pos_2},
    {stimulus: 'cake',      category: "approach_words_pos", movement: approach_pos_2},
    {stimulus: 'chocolate', category: "approach_words_pos", movement: approach_pos_2},
    {stimulus: 'acne',      category: "approach_words_neg", movement: approach_neg_2},
    {stimulus: 'blood',     category: "approach_words_neg", movement: approach_neg_2},
    {stimulus: 'cockroach', category: "approach_words_neg", movement: approach_neg_2},
    {stimulus: 'coffin',    category: "approach_words_neg", movement: approach_neg_2},
    {stimulus: 'corpse',    category: "approach_words_neg", movement: approach_neg_2},
  ];

  var vaast_stim_block_2_words = [
    {stimulus: 'baby',       category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'beach',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'birthday',   category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'gift',       category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'happiness',  category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'health',     category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'holidays',   category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'hug',        category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'humor',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'joy',        category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'laugh',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'party',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'passion',    category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'peace',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'pleasure',   category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'relax',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'share',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'smile',      category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'sun',        category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'triumph',    category: "approach_words_pos",  movement: approach_pos_2},
    {stimulus: 'accident',   category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'attack',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'bomb',       category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'cancer',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'coffin',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'danger',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'dead',       category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'death',      category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'disease',    category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'divorce',    category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'failure',    category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'lost',       category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'misery',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'murder',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'pain',       category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'poison',     category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'suicide',    category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'tomb',       category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'torture',    category: "approach_words_neg",  movement: approach_neg_2},
    {stimulus: 'war',        category: "approach_words_neg",  movement: approach_neg_2},
  ];

  // vaast stimuli sizes -------------------------------------------------------------------

  var word_sizes = [
    38,
    46,
    60
  ];

  var resize_factor = 7;
  var image_sizes = word_sizes.map(function(x) { return x * resize_factor; });

  // Helper functions ---------------------------------------------------------------------
  // next_position():
  // Compute next position as function of current position and correct movement. Because
  // participant have to press the correct response key, it always shows the correct
  // position.
  var next_position = function(){
    var current_position = jsPsych.data.getLastTrialData().values()[0].position;
    var current_response = jsPsych.data.getLastTrialData().values()[0].key_press;
    var position = current_position;

    var approach_keycode  = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(approach_key);
    var avoidance_keycode = jsPsych.pluginAPI.convertKeyCharacterToKeyCode(avoidance_key);

    if(current_response == approach_keycode) {
      position = position + 1;
    }

    if(current_response == avoidance_keycode) {
      position = position -1;
    }

    return(position)
  }
  // Saving blocks ------------------------------------------------------------------------
  // Every function here send the data to keen.io. Because data sent is different according
  // to trial type, there are differents function definition.

  // init ---------------------------------------------------------------------------------
  var saving_id = function(){
    database
        .ref("participant_id_fondVAAST/")
        .push()
        .set({session_id: session_id,
          	   prolific_id: prolific_id,
          	   background: background,
          	   timestamp: firebase.database.ServerValue.TIMESTAMP,
               vaast_cond_block_1: vaast_cond_block_1,
               vaast_cond_block_2: vaast_cond_block_2})
  }

  // vaast trial --------------------------------------------------------------------------
  var saving_vaast_trial = function(){
  	database
  	  .ref("vaast_trial_fondVAAST/").
      push()
        .set({session_id: session_id,
          prolific_id: prolific_id,
          background: background,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          vaast_cond_block_1: vaast_cond_block_1,
          vaast_cond_block_2: vaast_cond_block_2,
          vaast_trial_data: jsPsych.data.get().last(4).json()})
  }

  var saving_extra = function() {
  	database
  	 .ref("extra_info_fondVAAST/")
     .push()
  	 .set({session_id: session_id,
  	 	   prolific_id: prolific_id,
  	 	   background: background,
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         vaast_cond_block_1: vaast_cond_block_1,
         vaast_cond_block_2: vaast_cond_block_2,
         extra_data: jsPsych.data.get().last(7).json(),
        })
  }

  var saving_browser_events = function(completion) {
  	database
  	 .ref("browser_event_fondVAAST/")
     .push()
  	 .set({session_id: session_id,
  	 	   prolific_id: prolific_id,
  	 	   background: background,
         timestamp: firebase.database.ServerValue.TIMESTAMP,
         vaast_cond_block_1: vaast_cond_block_1,
         vaast_cond_block_2: vaast_cond_block_2,
      completion: completion,
      event_data: jsPsych.data.getInteractionData().json()})
  }
  // saving blocks ------------------------------------------------------------------------
  var save_id = {
      type: 'call-function',
      func: saving_id
  }

  var save_vaast_trial = {
      type: 'call-function',
      func: saving_vaast_trial
  }

  var save_extra = {
      type: 'call-function',
      func: saving_extra
  }

  // iat sampling function ----------------------------------------------------------------
  var sample_n = function(list, n) {
    list = jsPsych.randomization.sampleWithReplacement(list, n);
    list = jsPsych.randomization.shuffleNoRepeats(list);

    return(list);
  }
  // EXPERIMENT ---------------------------------------------------------------------------




  // initial instructions -----------------------------------------------------------------
  var welcome = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'> Welcome </h1>" +
      "<p class='instructions'>Thank you for taking part in this study.<p>" +
      "<p class='instructions'>During this study, you will have to complete two different categorization tasks. We " +
      " will record your performance on these tasks but " +
      "we will not collect any personally identifying information.</p>" +
      "<p class='instructions'>Because we rely on third party services to gather data, ad-blocking " +
      "softwares might interfere with data collection. Therefore, please  " +
      "disable your ad-blocking software during this study. " +
      "<b>If we are unable to record your data, we will not be able to reward you for " +
      "your participation</b>. </p>" +
      "<p class='instructions'>If you have any question related to this research, please " +
      "e-mail me at marine.rougier@uclouvain.be.</p>" +
      "<p class = 'continue-instructions'>Press <strong>space</strong> to start the study.</p>",
    choices: [32]
  };

  var consent = {
    type: "html-button-response",
    stimulus:
    "<h1 class ='custom-title'> Informed consent </h1>" +
      "<p class='instructions'>By clicking below to start the study, you recognize that:</p>" +
        "<ul class='instructions'>" +
          "<li>You know you can stop your participation at any time, without having to justify yourself. " +
          "However, keep in mind that you have to complete the whole study in order to be paid.</li>" +
          "<li>You know you can contact our team for any questions or dissatisfaction related to your " +
          "participation in the research via the following email address: marine.rougier@uclouvain.be.</li>" +
          "<li>You know the data collected will be strictly confidential and it will be impossible for " +
          "any unauthorized third party to identify you.</li>" +
        "</ul>" +
      "<p class='instructions'><u><b>WARNING:</u> Be aware that some unpleasant images presented during the experiment might shock you</b>.</p>" +
      "<p class='instructions'>By clicking on the \"I confirm\" button, you give your free and informed consent to participate " +
      "in this research.</p>",
    choices: ['I confirm']
  }

  var welcome_2 = {
    type: "html-button-response",
    stimulus:
      "<p class='instructions'>Before going further, please note that this study should take " +
      "15-17 minutes to complete.</p>",
    choices: ['I have enough time', 'I do not have enough time'],
  };

  var not_enough_time_to_complete = {
      type: 'html-button-response',
      stimulus: '<p>Please come back later to take part in this experiment.</p>',
      choices: ['Go back to Prolific Academic'],
  };

  var redirect_to_prolific = {
      type: 'call-function',
      func: function() {
          window.location.href = "https://www.prolific.ac/";
          jsPsych.pauseExperiment();
      }
  }

  var if_not_enough_time = {
      timeline: [not_enough_time_to_complete, redirect_to_prolific],
      conditional_function: function(){
          // get the data from the previous trial,
          // and check which key was pressed
          var data = jsPsych.data.getLastTrialData().values()[0].button_pressed;
          if(data == 1){
              return true;
          } else {
              return false;
          }
      }
  }

  // Switching to fullscreen --------------------------------------------------------------
  var fullscreen_trial = {
    type: 'fullscreen',
    message:  '<p>To take part in this study, your browser needs to be set to fullscreen.</p>',
    button_label: 'Switch to fullscreen',
    fullscreen_mode: true
  }

  // Initial instructions -----------------------------------------------------------------
  // First slide --------------------------------------------------------------------------
  var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p class='instructions'>You are now about to start the study. "+
    "<br><br>"+
    "In this study, you will engage in two categorization tasks (Task 1 and Task 2). " +
    "Each of these two tasks is divided into two sections (first section and second section).</p>" +
    "<p class = 'continue-instructions'>Press <strong>space</strong> to start.</p>",
    choices: [32]
  };

  // VAAST instructions -------------------------------------------------------------------

  var vaast_instructions_1 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Video Game Task</h1>" +
      "<p class='instructions'>In these two tasks, like in a video game, you will see an environment " +
      "(presented below) in which you will be able to move forward or backward.</p>" +
      "<p class='instructions'><center>" +
        "<img src = 'media/vaast-background.png'>" +
      "</center></p>" +
      "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var vaast_instructions_2 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Video Game Task</h1>" +
      "<p class='instructions'>Words or images will appear in this environment and your task " +
      "will be to move forward or backward as a function of the type of word/image (more specific instructions following).</p>" +
      "<p class='instructions'> To move forward or backward, you will use the following keys " +
      "of your keyboard:</p>" +
      "<p class='instructions'><center>" +
        "<img src = 'media/keyboard-vaastt.png'>" +
      "</center></p>" +
      "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var vaast_instructions_3 = {
    type: "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Video Game Task</h1>" +
      "<p class='instructions'>At the beginning of each trial, you will see the 'O' symbol. This symbol " +
      "indicates that you have to press the <b>START key</b> (namely the <b>D key</b>) to start the trial.</p>" +
      "<p class='instructions'>Then, you will see a fixation cross (+) at the center of the screen, followed " +
      "by a word or an image.</p>" +
      "<p class='instructions'>Your task is to move forward or backward by pressing the <b>MOVE FORWARD</b> " +
      "(the <b>E key</b>) or the <b>MOVE BACKWARD</b> (the <b>C key</b>) key <strong>as fast as possible</strong>.</p>" +
      "<p class='instructions'>For all of these actions, please only use the index of your dominant hand.</p>" +
      "<p class='continue-instructions'>Press <strong>space</strong> to start Task 1.</p>",
    choices: [32]
  };

  var vaast_instructions_training_block_1 = {
      type : "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Video Game Task: Task 1</h1>" +
        "<p class='instructions'><center><strong>INSTRUCTION FOR THIS FIRST SECTION</strong></center></p>" +
        "<p class='instructions'>In this section, you have to:</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROACH " + stim_to_approach_1 + " by pressing the MOVE FORWARD key <br>(i.e., the " + approach_key + " key)</strong></li>" +
          "<li><strong>AVOID " + stim_to_avoid_1 + " by pressing the MOVE BACKWARD key <br>(i.e., the " + avoidance_key + " key)</strong></li>" +
         "</ul>" +
        "<p class='instructions'>You will start with a training phase.</p>" +
        "<p class='instructions'><u>WARNING:</u> we will report your errors ONLY during the training phase, so " +
        "it is important that you read carefully and memorize the instructions above.</p>" +
        "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
      choices: [32]
  };

  var vaast_instructions_test_block_1 = {
      type: "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Video Game Task: Task 1</h1>" +
        "<p class='instructions'>The training phase is now over.</p>" +
        "<p class='instructions'><u>WARNING:</u> you will no longer have a message to report your errors.</p>" +
        "<p class='instructions'>As a reminder, you have to:</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROACH " + stim_to_approach_1 + " by pressing the MOVE FORWARD key <br>(i.e., the " + approach_key + " key)</strong></li>" +
          "<li><strong>AVOID " + stim_to_avoid_1 + " by pressing the MOVE BACKWARD key <br>(i.e., the " + avoidance_key + " key)</strong></li>" +
         "</ul>" +
        "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var vaast_instructions_training_block_2 = {
    type : "html-keyboard-response",
    stimulus:
      "<h1 class ='custom-title'>Video Game Task: Task 1</h1>" +
      "<p class='instructions'><center><strong>INSTRUCTION FOR THIS SECOND SECTION</strong></center></p>" +
      "<p class='instructions'>In this section, you have to:</p>" +
       "<ul class='instructions'>" +
        "<li><strong>APPROACH " + stim_to_approach_2 + " by pressing the MOVE FORWARD key <br>(i.e., the " + approach_key + " key)</strong></li>" +
        "<li><strong>AVOID " + stim_to_avoid_2 + " by pressing the MOVE BACKWARD key <br>(i.e., the " + avoidance_key + " key)</strong></li>" +
       "</ul>" +
      "<p class='instructions'>You will start with a training phase.</p>" +
      "<p class='instructions'><u>WARNING:</u> we will report your errors ONLY during the training phase, so " +
      "it is important that you read carefully and memorize the instructions above.</p>" +
      "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var vaast_instructions_test_block_2 = {
      type: "html-keyboard-response",
      stimulus:
        "<h1 class ='custom-title'>Video Game Task: Task 1</h1>" +
        "<p class='instructions'>The training phase is now over.</p>" +
        "<p class='instructions'><u>WARNING:</u> you will no longer have a message to report your errors.</p>" +
        "<p class='instructions'>As a reminder, you have to:</p>" +
         "<ul class='instructions'>" +
          "<li><strong>APPROACH " + stim_to_approach_2 + " by pressing the MOVE FORWARD key <br>(i.e., the " + approach_key + " key)</strong></li>" +
          "<li><strong>AVOID " + stim_to_avoid_2 + " by pressing the MOVE BACKWARD key <br>(i.e., the " + avoidance_key + " key)</strong></li>" +
         "</ul>" +
        "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var vaast_instructions_4 = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'><center>Before you start:</center></p>" +
      "<p class='instructions'>Remember that it is EXTREMELY IMPORTANT that you try to " +
      "respond as fast and as correctly as possible.</p>" +
      "<br>" +
      "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  }

  var vaast_instructions_5 = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'><center><strong>End of this section</strong></center></p>" +
      "<br>" +
      "<p class = 'continue-instructions'><center>Press <strong>space</strong> to continue.</center></p>",
    choices: [32]
  };


  // Creating a trial ---------------------------------------------------------------------

  var vaast_start = {
    type: 'vaast-text',
    stimulus: "o",
    position: 1,
    background_images: background,
    font_sizes:  word_sizes,
    approach_key: "d",
    stim_movement: "approach",
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: true,
    display_feedback: true,
    response_ends_trial: true
  }

  var vaast_fixation = {
    type: 'vaast-fixation',
    fixation: "+",
    font_size: 46,
    position: 1,
    background_images: background
  }

  var vaast_first_step_train_1 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: true,
    feedback_duration: 500, 
    response_ends_trial: true
  }

  var vaast_first_step_1 = {
    type: 'vaast-text',
    stimulus: jsPsych.timelineVariable('stimulus'),
    position: 1,
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    approach_key:  approach_key,
    avoidance_key: avoidance_key,
    html_when_wrong: '<span style="color: red; font-size: 80px">&times;</span>',
    force_correct_key_press: false,
    display_feedback: false,
    response_ends_trial: true
  }

  var vaast_second_step_1 = {
    type: 'vaast-text',
    position: next_position,
    stimulus: jsPsych.timelineVariable('stimulus'),
    background_images: background,
    font_sizes: word_sizes,
    stim_movement: jsPsych.timelineVariable('movement'),
    response_ends_trial: false,
    trial_duration: 500
  }

  var vaast_second_train_1 = {
    chunk_type: "if",
    timeline: [vaast_second_step_1],
    conditional_function: function(){
      var data = jsPsych.data.getLastTrialData().values()[0];
      return data.correct;
    }
  }

  // VAAST blocks ---------------------------------------------------------------------

  var vaast_training_block_1 = {
    timeline: [
    	vaast_start, 
    	vaast_fixation, 
    	vaast_first_step_train_1, 
    	vaast_second_train_1, 
    	save_vaast_trial
    ],
    timeline_variables: vaast_stim_training_block_1_words,
    repetitions: 1,
    randomize_order: true
  };

  var vaast_test_block_1 = {
    timeline: [
    	vaast_start, 
    	vaast_fixation, 
    	vaast_first_step_1, 
    	vaast_second_step_1, 
    	save_vaast_trial
    ],
    timeline_variables: vaast_stim_block_1_words,
    repetitions: 1,
    randomize_order: true
  };
  
  var vaast_training_block_2 = {
    timeline: [
    	vaast_start, 
    	vaast_fixation, 
    	vaast_first_step_train_1, 
    	vaast_second_train_1, 
    	save_vaast_trial
    ],
    timeline_variables: vaast_stim_training_block_2_words,
    repetitions: 1,
    randomize_order: true
  };

  var vaast_test_block_2 = {
    timeline: [
    	vaast_start, 
    	vaast_fixation, 
    	vaast_first_step_1, 
    	vaast_second_step_1, 
    	save_vaast_trial
    ],
    timeline_variables: vaast_stim_block_2_words,
    repetitions: 1,
    randomize_order: true
  };
  
  // end fullscreen -----------------------------------------------------------------------

  var fullscreen_trial_exit = {
    type: 'fullscreen',
    fullscreen_mode: false
  }

  // demographics + questions -------------------------------------------------------------

  var extra_information = {
    type: 'html-keyboard-response',
    stimulus:
      "<p class='instructions'>The study is almost finished. Now, you have to answer a few questions.</p>" +
      "<p class='continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var extra_information_1 = {
    type: 'survey-multi-choice',
    questions: [
      {prompt: "Have you ever completed the previous task in the past?",
       options: ["Yes", "No", "I cannot remember"], required: true, horizontal: true}
      ],
    button_label: "Submit"
  };

  var extra_information_2 = {
    timeline: [{
      type: 'survey-text',
      questions: [{prompt: "What is your age?"}],
      button_label: "Submit",
    }],
    loop_function: function(data) {
      var extra_information_2 = data.values()[0].responses;
      var extra_information_2 = JSON.parse(extra_information_2).Q0;
      if (extra_information_2 == "") {
        alert("Please enter you age!");
        return true;
      }
    },
    on_finish: function(data) {
      jsPsych.data.addProperties({
        extra_information_2: JSON.parse(data.responses)["Q0"],
      });
    }
  }

  var extra_information_3 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "What is your sex?", options: ["&nbspMale", "&nbspFemale", "&nbspOther"], required: true, horizontal: true}],
    button_label: "Submit"
  }

  var extra_information_4 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "How well do you speak english?",
                 options: ["&nbspFluently", "&nbspVery good", "&nbspGood", "&nbspAverage", "&nbspBad", "&nbspVery bad"],
                 required: true, horizontal: false}],
    button_label: "Submit"
  }

  var extra_information_5 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "What is your socioeconomic status?",
                 options: ["&nbspVery low", "&nbspLow", "&nbspMedium", "&nbspHigh", "&nbspVery high"],
                 required: true, horizontal: false}],
    button_label: "Submit"
  }

  var extra_information_6 = {
    type: 'survey-multi-choice',
    questions: [{prompt: "What is your highest level of education?",
                 options: ["&nbspDid not complete high school", "&nbspHigh school/GED", "&nbspSome college", "&nbspBachelor's degree", "&nbspMaster's degree", "&nbspAdvanced graduate work or Ph.D."],
                 required: true, horizontal: false}],
    button_label: "Submit"
  }

  var extra_information_7 = {
    type: 'survey-text',
    questions: [{prompt: "Do you have any remarks about this study? [Optional]"}],
    button_label: "Submit"
  }

  // end insctruction ---------------------------------------------------------------------

  var ending = {
    type: "html-keyboard-response",
    stimulus:
      "<p class='instructions'>You are now finished with this study.<p>" +
      "<p class='instructions'>In this study, we were interested in the measure of " +
      "approach and avoidance tendencies. Research show that individuals are generally " +
      "faster to approach positive stimuli and to avoid negative stimuli (rather than the reverse). </p>" +
      "<p class='instructions'> Here, we wanted to see if this effect was larger for one visual environment " +
      "compared to the other. </p>" +
      "<p class='instructions'>For more information to this topic, please send a message on Prolific </p>" +
      "<p class = 'continue-instructions'>Press <strong>space</strong> to continue.</p>",
    choices: [32]
  };

  var ending_2 = {
    type: "html-keyboard-response",
    trial_duration: 2000,
    stimulus:
      "<p class='instructions'>You will now be redirected to Prolific Academic's website " +
      "within seconds.<p>" +
      "<p class='instructions'>If you are not redirected, please click <a href='https://app.prolific.ac/submissions/complete?cc=MEMHX5XQ'>here</a>.<p>",
    choices: jsPsych.NO_KEYS
  };
  // procedure ----------------------------------------------------------------------------
  // Initialize timeline ------------------------------------------------------------------
  var timeline = [];

  welcome
  timeline.push(welcome,
                consent,
                //welcome_2,
                if_not_enough_time);

  // prolific verification
  timeline.push(save_id);

  // fullscreen
  timeline.push(fullscreen_trial,
                hiding_cursor);

  // initial instructions
  timeline.push(instructions);

  // vaast - instructions
  timeline.push(vaast_instructions_1,
                vaast_instructions_2,
                vaast_instructions_3);

 // vaast - blocks
  timeline.push(vaast_instructions_training_block_1,
                vaast_instructions_4,
                vaast_training_block_1,
                vaast_instructions_test_block_1,
                vaast_test_block_1,
                vaast_instructions_5,
                vaast_instructions_training_block_2,
                vaast_instructions_4,
                vaast_training_block_2,
                vaast_instructions_test_block_2,
                vaast_test_block_2,
                vaast_instructions_5);

  // vaast - end
  timeline.push(fullscreen_trial_exit,
                showing_cursor);

 // demographic questions
  timeline.push(extra_information,
                //extra_information_1,
                extra_information_2,
                extra_information_3,
                extra_information_4,
                extra_information_5,
                extra_information_6,
                extra_information_7,
                save_extra);

  // ending
  timeline.push(ending,
                ending_2);

  // Launch experiment --------------------------------------------------------------------
  // preloading ---------------------------------------------------------------------------
  // Preloading. For some reason, it appears auto-preloading fails, so using it manually.
  // In principle, it should have ended when participants starts VAAST procedure (which)
  // contains most of the image that have to be pre-loaded.
  var loading_gif               = ["media/loading.gif"]
  var vaast_instructions_images = ["media/vaast-background.png", "media/keyboard-vaastt.png"];
  var vaast_bg_filename         = ["background/env_eco/2.jpg", "background/env_eco/4.jpg", "background/env_eco/6.jpg", 
  									"background/fv_eco/2.jpg", "background/fv_eco/4.jpg", "background/fv_eco/6.jpg"];

  jsPsych.pluginAPI.preloadImages(loading_gif);
  jsPsych.pluginAPI.preloadImages(vaast_instructions_images);
  jsPsych.pluginAPI.preloadImages(vaast_bg_filename);
  // timeline initiaization ---------------------------------------------------------------

  if(is_compatible) {
    jsPsych.init({
        timeline: timeline,
        on_interaction_data_update: function() {
          saving_browser_events(completion = false);
        },
      on_finish: function() {
          saving_browser_events(completion = true);
          window.location.href = "https://app.prolific.ac/submissions/complete?cc=MEMHX5XQ";
      }
    });
  }
