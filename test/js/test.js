'use strict';

$(function(){
	var template = $('#result').html();

	var data = {
		title: 'Test',
		question: ['Question 1', 'Question 2', 'Question 3'],
		answer: [['variant №1', 'variant №2', 'variant №3'],
            ['variant №1', 'variant №2', 'variant №3'],
            ['variant №1', 'variant №2', 'variant №3']
        ],
        rightAnswerIndex: [2, 2, 1]
    };

    renderHtml(data);

    class Test {

        constructor(questionTitle, answers, rightAnswersIndex) {

            if (rightAnswersIndex.length == 0) {
                throw Error("No right answer selected");
            }

            this.question = questionTitle;
            this.answers = answers;
            this.rightAnswersIndex = rightAnswersIndex;
        }
    }

    class TestRadio extends Test {

        constructor(questionTitle, answers, rightAnswersIndex) {
            if (rightAnswersIndex.length != 1) {
                throw Error("Wrong Class");
            }

            super(questionTitle, answers, rightAnswersIndex)
        }
    }

    class TestCheckbox extends Test {

        constructor(questionTitle, answers, rightAnswersIndex) {

            super(questionTitle, answers, rightAnswersIndex)
        }
    }

    function handleInput() {

        // collect data

        var questuonTitel = $('.question').val();
        var answers = [];
        var rightAnswersIndex = [];
        var inputAnswers = $('.answers');


        $.each(inputAnswers, function (i, answer) {
            var $answer = $(answer);

            if ($answer.val().length == 0) {
                return;
            }
            answers.push($answer.val());

            if ($('#t' + i + '.rightAnswers:checked').length > 0) {
                rightAnswersIndex.push(i);
            }
        });

        // make object
        var myTest = new Test(questuonTitel, answers, rightAnswersIndex);

        console.log(myTest);

        // save data
        var myTest_arr = localStorage.getItem('myTest');
        myTest_arr = JSON.parse(myTest_arr);

        if (myTest_arr == null) {
            myTest_arr = [];
        }

        myTest_arr.push(myTest);

        localStorage.setItem('myTest', JSON.stringify(myTest_arr));

        resetFormState();
    }

    function resetFormState() {
        $('input').val('');
        $(':checkbox').each(function(i,item){
            this.checked = item.defaultChecked;
        });

        var myTest_arr = localStorage.getItem('myTest');
        myTest_arr = JSON.parse(myTest_arr);
        console.log(myTest_arr);
    }


    var myTest = new Test('Вопрос №1', ['Вариант ответа №1', 'Вариант ответа №2', 'Вариант ответа №3'], [2]);


    function renderHtml(data) {
        localStorage.setItem('date', JSON.stringify(data));
        var data_obj = localStorage.getItem('date');

        data_obj = JSON.parse(data_obj);


        var content = tmpl(template, data_obj);
        $('body').append(content);


        $('button.submit').click(function (e) {
            e.preventDefault();
            handleInput();
        });


    }
});
