// Here we define all custom functions
//They are in order of their occurence in the experiment


/* For generating random participant IDs */
// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
// dec2hex :: Integer -> String
const dec2hex = function(dec) {
    return ("0" + dec.toString(16)).substr(-2);
};


// generateId :: Integer -> String
const generateID = function(len) {
    let arr = new Uint8Array((len || 40) /2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, this.dec2hex).join("");
};


// A simple function to display the title of a view
const show_only_title = function(config, CT) {
    return `<div class='magpie-view'>
            <h1 class='magpie-view-title'>${config.title}</h1>
            <p class='magpie-view-question'></p>
        </div>`;
};


//present 8 different topics to choose from
const select_topic = function(config, CT) {
    return `<div class='magpie-view-answer-container'>
                <p class='magpie-view-question'>${config.data[CT].question}</p>
                <label for='s1' class='magpie-response-sentence'>${config.data[CT].option1}</label>
                <input type='radio' name='answer' id='s1' value="${config.data[CT].option1}" />
                <label for='s2' class='magpie-response-sentence'>${config.data[CT].option2}</label>
                <input type='radio' name='answer' id='s2' value="${config.data[CT].option2}" />
                <label for='s3' class='magpie-response-sentence'>${config.data[CT].option3}</label>
                <input type='radio' name='answer' id='s3' value="${config.data[CT].option3}" />
                <label for='s4' class='magpie-response-sentence'>${config.data[CT].option4}</label>
                <input type='radio' name='answer' id='s4' value="${config.data[CT].option4}" />
                <label for='s5' class='magpie-response-sentence'>${config.data[CT].option5}</label>
                <input type='radio' name='answer' id='s5' value="${config.data[CT].option5}" />
                <label for='s6' class='magpie-response-sentence'>${config.data[CT].option6}</label>
                <input type='radio' name='answer' id='s6' value="${config.data[CT].option6}" />
                <label for='s7' class='magpie-response-sentence'>${config.data[CT].option7}</label>
                <input type='radio' name='answer' id='s7' value="${config.data[CT].option7}" />
                <label for='s8' class='magpie-response-sentence'>${config.data[CT].option8}</label>
                <input type='radio' name='answer' id='s8' value="${config.data[CT].option8}" />
            </div>`;
};


// declares the global variable main.topic after the participant chose their topic
const select_statement = function(config, CT, magpie, answer_container_generator, startingTime) {
    $(".magpie-view").append(answer_container_generator(config, CT));

    $("input[name=answer]").on("change", function(e) {
        if (e.target.value === config.data[CT].option1) {
            main.topic = "gun control";
        }else if (e.target.value === config.data[CT].option2) {
            main.topic = "feminism";
        }else if (e.target.value === config.data[CT].option3) {
            main.topic = "AfD";
        }else if (e.target.value === config.data[CT].option4) {
            main.topic = "refugees";
        }else if (e.target.value === config.data[CT].option5) {
            main.topic = "transgender rights";
        }else if (e.target.value === config.data[CT].option6) {
            main.topic = "drug legalization";
        }else if (e.target.value === config.data[CT].option7) {
            main.topic = "buying and wearing fur";
        }else if (e.target.value === config.data[CT].option8) {
            main.topic = "taxing religious organizations";
        }
        //const RT = Date.now() - startingTime;
        let trial_data = {
            trial_name: config.name,
            trial_number: CT + 1,
            response: $("input[name=answer]:checked").val(),
            question: "Please select the topic you care about the most"
            //RT: RT
        };

        //trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

        magpie.trial_data.push(trial_data);
        magpie.findNextView();

    });
};


// 11 point likert scale for the strongly disagree - strongly agree scale for caring about a topic
const eleven_point_likert_scale = function(config, index){
    return `
        <h1 class='magpie-view-question magpie-view-qud'>${config.data[index].question}</h1>
        <p class='magpie-view-question magpie-view-qud'>${config.data[index].QUD}</p>
            <div class='magpie-view-answer-container'>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionLeft}</strong>
                <label for="-5" class='magpie-response-rating'>-5</label>
                <input type="radio" name="answer" id="-5" value="-5" />
                <label for="-4" class='magpie-response-rating'>-4</label>
                <input type="radio" name="answer" id="-4" value="-4" />
                <label for="-3" class='magpie-response-rating'>-3</label>
                <input type="radio" name="answer" id="-3" value="-3" />
                <label for="-2" class='magpie-response-rating'>-2</label>
                <input type="radio" name="answer" id="-2" value="-2" />
                <label for="-1" class='magpie-response-rating'>-1</label>
                <input type="radio" name="answer" id="-1" value="-1" />
                <label for="0" class='magpie-response-rating'>0</label>
                <input type="radio" name="answer" id="0" value="0" />
                <label for="1" class='magpie-response-rating'>1</label>
                <input type="radio" name="answer" id="1" value="1" />
                <label for="2" class='magpie-response-rating'>2</label>
                <input type="radio" name="answer" id="2" value="2" />
                <label for="3" class='magpie-response-rating'>3</label>
                <input type="radio" name="answer" id="3" value="3" />
                <label for="4" class='magpie-response-rating'>4</label>
                <input type="radio" name="answer" id="4" value="4" />
                <label for="5" class='magpie-response-rating'>5</label>
                <input type="radio" name="answer" id="5" value="5" />
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionRight}</strong>
            </div>`;
};


// To generate random integers (for the group conditions)
const getRandInt = function(min,max){
    return Math.floor(Math.random() * (max - min +1)) + min;
};


// generates random integer between 1 and 4 to assign the participant to a ingroup
// based on that number the participant will be shown different statements defined in
// the function experimental_stimulus below
const assign_to_group = function(config) {
    main.group = getRandInt(1,4);
    if(main.group == 1){
        return `<div class='magpie-view'>
                <h1 class='magpie-view-title'>${config.title}</h1>
                <p class='magpie-view-question'>${config.data[0].dilemma}</p>
                <p class='magpie-view-question magpie-view-qud'>${experimental_stimulus(main.group, main.topic)}</p>
            </div>`;
    }
    else if(main.group == 2){
        return `<div class='magpie-view'>
                <h1 class='magpie-view-title'>${config.title}</h1>
                <p class='magpie-view-question'>${config.data[0].dilemma}</p>
                <p class='magpie-view-question magpie-view-qud'>${experimental_stimulus(main.group, main.topic)}</p>
            </div>`;
    }else if(main.group == 3){
        return `<div class='magpie-view'>
                <h1 class='magpie-view-title'>${config.title}</h1>
                <p class='magpie-view-question'>${config.data[0].dilemma}</p>
                <p class='magpie-view-question magpie-view-qud'>${experimental_stimulus(main.group, main.topic)}</p>
            </div>`;
    }else if(main.group == 4){
        return `<div class='magpie-view'>
                <h1 class='magpie-view-title'>${config.title}</h1>
                <p class='magpie-view-question'>${config.data[0].dilemma}</p>
                <p class='magpie-view-question magpie-view-qud'>${experimental_stimulus(main.group, main.topic)}</p>
            </div>`;
    }
};


// based on the randomly generated number in the function assign_to_group above
// the participant sees different statements
// if the participant is in group 3 or 4 then the order of the statements is randomized
// again to controll for a bias
const experimental_stimulus = function(group, topic){
    if(group == 1){
        return `Approximately 60% of participants who agreed with you about  ${topic} chose to call the police and report the robber.`
    }

    if(group == 2){
        return `Approximately 60% of participants who agreed with you about  ${topic} chose to do nothing and leave the robber alone.`
    }

    if(group == 3){
      rnd = getRandInt(1,2);
      if(rnd == 1){
        return `Approximately 60% of participants who agreed with you about  ${topic} chose to call the police and report the robber.
                <br />
                <br />
                Approximately 85% of participants who disagreed with you about  ${topic} chose to do nothing and leave the robber alone.`
      }

      else{
        return `Approximately 85% of participants who disagreed with you about  ${topic} chose to do nothing and leave the robber alone.
                <br />
                <br />
                Approximately 60% of participants who agreed with you about  ${topic} chose to call the police and report the robber.`
      }

    }

    if(group == 4){
      rnd = getRandInt(1,2);
      if(rnd == 1){
        return `Approximately 60% of participants who agreed with you about  ${topic} chose to do nothing and leave the robber alone.
                <br />
                <br />
                Approximately 85% of participants who disagreed with you about  ${topic} chose to call the police and report the robber.`
      }

      else{
        return `Approximately 85% of participants who disagreed with you about  ${topic} chose to call the police and report the robber.
                <br />
                <br />
                Approximately 60% of participants who agreed with you about  ${topic} chose to do nothing and leave the robber alone.`
      }
    }
};


// old version - new one below
//present 6 options ranging from calling police to do nothing in sentences on top of each other
/* const select_response = function(){
    return `<div class='magpie-view-answer-container'>
                <p class='magpie-view-question'>Would you:</p>
                <label for='s1' class='magpie-response-sentence'>Definitely call the police and report the robber</label>
                <input type='radio' name='answer' id='s1' value="1_Definitely call the police" />
                <label for='s2' class='magpie-response-sentence'>Very likely call the police and report the robber</label>
                <input type='radio' name='answer' id='s2' value="2_Very likely call the police" />
                <label for='s3' class='magpie-response-sentence'>Probably call the police and report the robber</label>
                <input type='radio' name='answer' id='s3' value="3_Probably call the police" />
                <label for='s4' class='magpie-response-sentence'>Probably do nothing and leave the robber alone</label>
                <input type='radio' name='answer' id='s4' value="4_Probably do nothing" />
                <label for='s5' class='magpie-response-sentence'>Very likely do nothing and leave the robber alone</label>
                <input type='radio' name='answer' id='s5' value="5_Very likely do nothing" />
                <label for='s6' class='magpie-response-sentence'>Definitely do nothing and leave the robber alone</label>
                <input type='radio' name='answer' id='s6' value="6_Definitely do nothing" />
            </div>`;
}
 */


 // 6 point likert scale like the default template just adjusted
 // used for the experimental_trial from "do nothing" to "call police"
 const six_point_likert_scale = function(){
     return `
             <div class='magpie-view-answer-container'>
                 <strong class='magpie-response-rating-option magpie-view-text'>Definitely call the police <br /> and report the robber</strong>
                 <label for="1" class='magpie-response-rating'>1</label>
                 <input type="radio" name="answer" id="1" value="1" />
                 <label for="2" class='magpie-response-rating'>2</label>
                 <input type="radio" name="answer" id="2" value="2" />
                 <label for="3" class='magpie-response-rating'>3</label>
                 <input type="radio" name="answer" id="3" value="3" />
                 <label for="4" class='magpie-response-rating'>4</label>
                 <input type="radio" name="answer" id="4" value="4" />
                 <label for="5" class='magpie-response-rating'>5</label>
                 <input type="radio" name="answer" id="5" value="5" />
                 <label for="6" class='magpie-response-rating'>6</label>
                 <input type="radio" name="answer" id="6" value="6" />
                 <strong class='magpie-response-rating-option magpie-view-text'>Definitely do nothing <br /> and leave the robber alone</strong>
             </div>`;
 };


// pushes the data when the participant made their decision about the moral dilemma
const response_experimental_trial =  function(config, CT, magpie, answer_container_generator, startingTime) {
    $(".magpie-view").append(answer_container_generator(config, CT));

    // attaches an event listener to the yes / no radio inputs
    // when an input is selected a response property with a value equal
    // to the answer is added to the trial object
    // as well as a readingTimes property with value
    $("input[name=answer]").on("change", function() {
        //const RT = Date.now() - startingTime;
        let trial_data = {
            trial_name: config.name,
            trial_number: CT + 1,
            response: $("input[name=answer]:checked").val(),
            question: "Call the police or do nothing ?",
            //RT: RT,
            //group: main.group
        };

        //trial_data = magpieUtils.view.save_config_trial_data(config.data[CT],trial_data);

        magpie.trial_data.push(trial_data);
        magpie.findNextView();
    });
};


// displays 4 statements to test the attention/understanding of the participants
// the first statement is correct, the other ones are false
// if the participant choses false, they will be excluded
const select_understanding_question = function(config, CT) {
    return `<div class='magpie-view-answer-container'>
                <p class='magpie-view-question'>${config.data[CT].question}</p>
                <label for='s1' class='magpie-response-sentence'>${config.data[CT].option1}</label>
                <input type='radio' name='answer' id='s1' value="correct" />
                <label for='s2' class='magpie-response-sentence'>${config.data[CT].option2}</label>
                <input type='radio' name='answer' id='s2' value="incorrect" />
                <label for='s3' class='magpie-response-sentence'>${config.data[CT].option3}</label>
                <input type='radio' name='answer' id='s3' value="incorrect" />
                <label for='s4' class='magpie-response-sentence'>${config.data[CT].option4}</label>
                <input type='radio' name='answer' id='s4' value="incorrect" />

            </div>`;
};


const understanding_handler = function(config, CT, magpie, answer_container_generator, startingTime) {
        $(".magpie-view").append(answer_container_generator(config, CT));
        $("input[name=answer]").on("change", function() {
            //const RT = Date.now() - startingTime;
            let trial_data = {
                trial_name: config.name,
                trial_number: CT + 1,
                response: $("input[name=answer]:checked").val(),
                question: "Which of the following is true about the previous study?",
                //RT: RT
            };

            //trial_data = magpieUtils.view.save_config_trial_data(config.data[CT], trial_data);

            magpie.trial_data.push(trial_data);
            magpie.findNextView();
        });
};

// displays two likert scales to see to which group the participant is identified with
// first "halve" is the pro group likert scale and the second "halve" is the anti group likert scale
// at the end is a button to get to the next view
const identity_check_viewTemplate = function(config, index){
    return `
        <h1 class='magpie-view-question magpie-view-qud'>${config.data[index].question}</h1>
        <p class='magpie-view-question magpie-view-qud'>I identify with ${config.data[index].Pro}</p>
            <div class='magpie-view-answer-container'>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionLeft}</strong>

                <input type="radio" name="first_answer" id="first_1" value="1"/>
                <label for="first_1" class='magpie-response-rating'>1</label>

                <input type="radio" name="first_answer" id="first_2" value="2"/>
                <label for="first_2" class='magpie-response-rating'>2</label>

                <input type="radio" name="first_answer" id="first_3" value="3"/>
                <label for="first_3" class='magpie-response-rating'>3</label>

                <input type="radio" name="first_answer" id="first_4" value="4"/>
                <label for="first_4" class='magpie-response-rating'>4</label>

                <input type="radio" name="first_answer" id="first_5" value="5"/>
                <label for="first_5" class='magpie-response-rating'>5</label>

                <input type="radio" name="first_answer" id="first_6" value="6"/>
                <label for="first_6" class='magpie-response-rating'>6</label>

                <input type="radio" name="first_answer" id="first_7" value="7"/>
                <label for="first_7" class='magpie-response-rating'>7</label>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionRight}</strong>
            </div>
          <p class='magpie-view-question magpie-view-qud'>I identify with ${config.data[index].Anti}</p>
            <div class='magpie-view-answer-container'>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionLeft}</strong>
                <input type="radio" name="second_answer" id="second_1" value="1" />
                <label for="second_1" class='magpie-response-rating'>1</label>

                <input type="radio" name="second_answer" id="second_2" value="2" />
                <label for="second_2" class='magpie-response-rating'>2</label>

                <input type="radio" name="second_answer" id="second_3" value="3" />
                <label for="second_3" class='magpie-response-rating'>3</label>

                <input type="radio" name="second_answer" id="second_4" value="4"/>
                <label for="second_4" class='magpie-response-rating'>4</label>

                <input type="radio" name="second_answer" id="second_5" value="5" />
                <label for="second_5" class='magpie-response-rating'>5</label>

                <input type="radio" name="second_answer" id="second_6" value="6" />
                <label for="second_6" class='magpie-response-rating'>6</label>

                <input type="radio" name="second_answer" id="second_7" value="7" />
                <label for="second_7" class='magpie-response-rating'>7</label>
                <strong class='magpie-response-rating-option magpie-view-text'>${config.data[index].optionRight}</strong>
            </div>
          <div>
            <button id="next" class='magpie-view-button'>${config.button}</button>
          </div>`;
};


// another understanding test to exclude participants that didnt pay attention
// maybe not be neccessary, but makes sense to see if the participant took the choices
// of the other people actually into account
const select_understanding_question2 = function(config, CT) {
    if (main.group == 1)
    {   return `<div class='magpie-view-answer-container'>
                <p class='magpie-view-question'>${config.data[CT].question}</p>
                <label for='s1' class='magpie-response-sentence'>The majority of people who agreed with you on ${main.topic} chose to leave the robber alone.</label>
                <input type='radio' name='answer' id='s1' value="incorrect" />
                <label for='s2' class='magpie-response-sentence'>The majority of people who agreed with you on ${main.topic} chose to call the police.</label>
                <input type='radio' name='answer' id='s2' value="correct" />`
    }
    if (main.group == 2)
    {
        return `<div class='magpie-view-answer-container'>
                    <p class='magpie-view-question'>${config.data[CT].question}</p>
                    <label for='s1' class='magpie-response-sentence'>The majority of people who agreed with you on ${main.topic} chose to leave the robber alone.</label>
                    <input type='radio' name='answer' id='s1' value="correct" />
                    <label for='s2' class='magpie-response-sentence'>The majority of people who agreed with you on ${main.topic} chose to call the police.</label>
                    <input type='radio' name='answer' id='s2' value="incorrect" />`
    }
    if (main.group == 3)
    {
        return `<div class='magpie-view-answer-container'>
                    <p class='magpie-view-question'>${config.data[CT].question}</p>
                    <label for='s1' class='magpie-response-sentence'>The majority of people who disagreed with you on ${main.topic} chose to leave the robber alone.</label>
                    <input type='radio' name='answer' id='s1' value="correct" />
                    <label for='s2' class='magpie-response-sentence'>The majority of people who disagreed with you on ${main.topic} chose to call the police.</label>
                    <input type='radio' name='answer' id='s2' value="incorrect" />`
    }
    if (main.group == 4)
    {
        return `<div class='magpie-view-answer-container'>
                    <p class='magpie-view-question'>${config.data[CT].question}</p>
                    <label for='s1' class='magpie-response-sentence'>The majority of people who disagreed with you on ${main.topic} chose to leave the robber alone.</label>
                    <input type='radio' name='answer' id='s1' value="correct" />
                    <label for='s2' class='magpie-response-sentence'>The majority of people who disagreed with you on ${main.topic} chose to call the police.</label>
                    <input type='radio' name='answer' id='s2' value="incorrect" />`
    }
};


// exploratory question
// prefer the company of someone who has the same opinion as the participant
const sympathy_stimulus = function(config, CT){
    return `<div class='magpie-view'>
            <h1 class='magpie-view-title'></h1>
            <p class='magpie-view-question'>${config.data[CT].question}</p>
            <p class='magpie-view-question'>I would prefer the company of someone who agrees with me on ${main.topic} over the company of someone who disagrees with me on ${main.topic}.</p>
        </div>`;
};


// exploratory question
// prefer the company of someone who has the same opinion as the participant
// the 7 point likert scale for that question
const sympathy_answer = function(config, CT){
       return  `<div class='magpie-view-answer-container'>
                   <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionLeft}</strong>
                   <label for="1" class='magpie-response-rating'>1</label>
                   <input type="radio" name="answer" id="1" value="1" />
                   <label for="2" class='magpie-response-rating'>2</label>
                   <input type="radio" name="answer" id="2" value="2" />
                   <label for="3" class='magpie-response-rating'>3</label>
                   <input type="radio" name="answer" id="3" value="3" />
                   <label for="4" class='magpie-response-rating'>4</label>
                   <input type="radio" name="answer" id="4" value="4" />
                   <label for="5" class='magpie-response-rating'>5</label>
                   <input type="radio" name="answer" id="5" value="5" />
                   <label for="6" class='magpie-response-rating'>6</label>
                   <input type="radio" name="answer" id="6" value="6" />
                   <label for="7" class='magpie-response-rating'>7</label>
                   <input type="radio" name="answer" id="7" value="7" />
                   <strong class='magpie-response-rating-option magpie-view-text'>${config.data[CT].optionRight}</strong>
               </div>`;
};


// the post_test_view template slightly changed
// displays demographic questions for the participant ranging from
// age to gender and location
// contains a comment section for the pilot study
const post_test_viewTemplate = function(config, CT){
    const quest = magpieUtils.view.fill_defaults_post_test(config);
    return `
        <form>
        <br>
        <p class='magpie-view-text'>
            <label>${config.text}</label>
        </p>
        <section class="magpie-text-container">
        <p class='magpie-view-text'>
            <label for="age">${quest.age.title}:</label>
            <input type="number" name="age" min="18" max="110" id="age" />
        </p>
        <br>
        <br>
        <p class='magpie-view-text'>
            <label for="gender">${quest.gender.title}:</label>
            <select id="gender" name="gender">
                <option></option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="non-binary">non-binary</option>
                <option value="prefer_not_to_say">prefer no to say</option>
                <option value="other">other</option>
            </select>
        </p>
        <br>
        <br>
        <br>
        <br>
        <p class='magpie-view-text'>
            <label>Thank you for participating in this experiment!</label>
        </p>
        <button id="next" class='magpie-view-button'>${config.button}</button>
        </form>
        </section>
        </div>`;
};


// pushes the data of the function post_test_viewTemplate above
const post_test_handler = function(config, CT, magpie) {
        $(".magpie-view").append(post_test_viewTemplate(config, CT));
        $("#next").on("click", function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            magpie.global_data.age = $("#age").val();
            magpie.global_data.gender = $("#gender").val();
            magpie.global_data.condition = main.group;
            magpie.findNextView();
          });
};
