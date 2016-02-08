(function() {
  var questions = $.parseJSON($.ajax({
    url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=35&limit=10&page=1', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method
    data: {}, // Additional parameters here
    datatype: 'json',
    async: false,
    success: function(data) {
      questions = data; //store data into questions
      console.log("Success!");
      console.log(questions[0].q_options_1);
      console.log(questions[0].q_options_2);
      console.log(questions[0].q_options_3);
      console.log(questions[0].q_options_4);
      console.log(questions[0].q_text);
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
      xhr.setRequestHeader("X-Mashape-Authorization", "rNq9CpOrHzmshInw94Se1tPCb9QFp1YXK58jsnGUStNE114o0T"); // Enter here your Mashape key
    }
  }).responseText);
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();

    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    var temp = questions[index].q_text;
    var regex = /(((&lt;)|(&lt;\/))\w+(&gt;))|((&lt;).+;(&gt;))|(&nbsp;)/g;
    //use regular expression to get rid of encoded html elements
    var questionText = temp.replace(regex, "");
    console.log(questionText);
    var question = $('<p>').append(questionText);
    qElement.append(question);

    var radioButtons = $('<ul>');
    var item;
    var input = '';
    item = $('<li>');
    input = '<input type="radio" name="answer" value="1" />';
    console.log(input);
    input += questions[index].q_options_1;
    console.log(input);
    item.append(input);
    radioButtons.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="2" />';
    console.log(input);
    input += questions[index].q_options_2;
    console.log(input);
    item.append(input);
    radioButtons.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="3" />';
    console.log(input);
    input += questions[index].q_options_3;
    console.log(input);
    item.append(input);
    radioButtons.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="4" />';
    console.log(input);
    input += questions[index].q_options_4;
    console.log(input);
    item.append(input);
    radioButtons.append(item);

    qElement.append(radioButtons);

    return qElement;
  }
  /*

  // Creates a list of the answer choices as radio inputs
  function createRadios(index, questions) {
    console.log(arr[index].q_option_1);
    console.log(arr[index].q_option_2);
    console.log(arr[index].q_option_3);
    console.log(arr[index].q_option_4);
    var radioList = $('<ul>');
    var item;
    var input = '';
    item = $('<li>');
    input = '<input type="radio" name="answer" value="1" />';
    console.log(input);
    input += arr[index].q_option_1;
    console.log(input);
    item.append(input);
    radioList.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="2" />';
    console.log(input);
    input += arr[index].q_option_2;
    console.log(input);
    item.append(input);
    radioList.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="3" />';
    console.log(input);
    input += arr[index].q_option_3;
    console.log(input);
    item.append(input);
    radioList.append(item);
    item = $('<li>');
    input = '<input type="radio" name="answer" value="4" />';
    console.log(input);
    input += arr[index].q_option_4;
    console.log(input);
    item.append(input);
    radioList.append(item);
    console.log("radioList");
    return radioList;
  }
*/
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){

          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});

    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].q_correct_option) {
        numCorrect++;
      }
    }

    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();

/*
$(document).ready(function() {
  var arrayIndex = 0;
  var quizs;
  $.ajax({
  url: 'https://pareshchouhan-trivia-v1.p.mashape.com/v1/getQuizQuestionsByCategory?categoryId=35&limit=10&page=1', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
  type: 'GET', // The HTTP Method
  data: {}, // Additional parameters here
  datatype: 'json',
  success: function(data) {
    quizs = data; //store data into quizs
    display();
  },
  error: function(err) { alert(err); },
  beforeSend: function(xhr) {
  xhr.setRequestHeader("X-Mashape-Authorization", "rNq9CpOrHzmshInw94Se1tPCb9QFp1YXK58jsnGUStNE114o0T"); // Enter here your Mashape key
  }
  });

  $("#next").click(function() {
    arrayIndex++;
    display();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
      $(this).addClass('active');
    });
    $('.button').on('mouseleave', function() {
      $(this).removeClass('active');
  });

  $('input').mouseup(function() {
    console.log("Click!");
    console.log($(this).checked.value());
    console.log($(this).checked);
  });

  $('input[type="radio"].toggle').click(function () {
    var $rb = $(this);

    if ($rb.val() === 'on') {
        $rb.val('off');
        this.checked = false;
    }
    else {
        $rb.val('on');
        this.checked = true;
    }
  });
  var checkanswer = function() {

  }
  var display = function () {
    console.log(quizs[arrayIndex].q_options_1);
    console.log(quizs[arrayIndex].q_options_2);
    console.log(quizs[arrayIndex].q_options_3);
    console.log(quizs[arrayIndex].q_options_4);
    console.log(quizs[arrayIndex].q_text);
    var temp = quizs[arrayIndex].q_text;
    var regex = /(((&lt;)|(&lt;\/))\w+(&gt;))|((&lt;).+;(&gt;))|(&nbsp;)/g;
    //use regular expression to get rid of encoded html elements
    var questionText = temp.replace(regex, "");
    console.log(questionText);
    var everything = "<h3> Q" +(arrayIndex+1)+": ";
    everything +=questionText+"</h3>";
    everything += "<ul>";
    everything +="<li><input id='op1' type='radio' class='toggle' value='off' >"+quizs[arrayIndex].q_options_1+"</input></li>";
    everything +="<li><input id='op2' type='radio' class='toggle' value='off' >"+quizs[arrayIndex].q_options_2+"</input></li>";
    everything +="<li><input id='op3' type='radio' class='toggle' value='off' >"+quizs[arrayIndex].q_options_3+"</input></li>";
    everything +="<li><input id='op4' type='radio' class='toggle' value='off' >"+quizs[arrayIndex].q_options_4+"</input></li></ul>";
    console.log(everything);
    console.log($('#op1').checked);
    console.log($('#op2').checked);
    console.log($('#op3').checked);
    console.log($('#op4').checked);
    $("#quiz").html(everything);
  }
});
*/
