var video;
var poseNet;
var poses = [];
var pose1 = 0
var pose2 = 0
var pose3 = 0
var pose4 = 0
var pose1text = document.getElementById("posevalue1")
var pose2text = document.getElementById("posevalue2")
var pose3text = document.getElementById("posevalue3")
var pose4text = document.getElementById("posevalue4")
var scoreText = document.getElementById("scoreText")
var currenQues = 0
var quesText = document.getElementById("quest")
var answer1 = document.getElementById("q1")
var answer2 = document.getElementById("q2")
var answer3 = document.getElementById("q3")
var answer4 = document.getElementById("q4")
var correctImg = document.getElementById("correct")
var incorrectImg = document.getElementById("incorrect")
var hasSelected = false
var hider = document.getElementById("hider")
var score = 0
var finished = false
var finishedText = document.getElementById("finishedText");
var scoreText2 = document.getElementById("scoreText2");
const delay = ms => new Promise(res => setTimeout(res, ms));




var questions = [
    [["Hvornår fik kvinderne stemmeret i Danmark?"],
     ["1915", true],
     ["1920",false],
     ["1945",false],
     ["1910", false]
    ],
    [["Hvad er det kemiske navn for salt?"],
    ["Sodium Chlorid", false],
    ["Natrium Chlorid", true],
    ["Natriumbicarbonat", false],
    ["Natriumkarbonat", false]
    ],
    [["Hvad er 9 + 10?"],
    ["16", false],
    ["21", true],
    ["18",false],
    ["19", true]

    ]
]


function setup() {
  createCanvas(480, 360);
  video = createCapture(VIDEO);
  video.size(width, height);
  


  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on("pose", function(results) {
    poses = results;
 
  });
  // Hide the video element, and just show the canvas
  video.hide();
  
}

function modelReady() {
    console.log("Model Ready");
}

async function draw() {
 if (finished == true) {
  hider.style.opacity = 1
  finishedText.classList.add("fading2")
  scoreText2.innerText = "Din score: " + score + " ud af " + questions.length
  await delay(2000)
  finishedText.style.opacity = 1;
 }
 if (finished == false) {
  image(video, 0, 0, width, height);}
  async function select(ansNum){
 
    console.log("selected: " + ansNum)
    currentQuestion = questions[currenQues]
    currentAnswers = currentQuestion[ansNum]
    if (currentAnswers[1] == true){
    console.log("true")
    correctImg.classList.add("selected")
    score += 1
    scoreText.innerText = "Score: " + score
    await delay(4000);
    hider.classList.add("fading")
    await delay(2000);
    if (currenQues +1 != questions.length) {
      currenQues += 1
    }
    else {
      finished = true
      hider.classList.remove("fading")
    }
    
    console.log("waited")
    hasSelected = false
    pose1 = 0 
    pose2 = 0
    pose3 = 0
    pose4 = 0
    pose1text.innerText = "Pose 1: " + pose1
    pose2text.innerText = "Pose 2: " + pose2
    pose3text.innerText = "Pose 3: " + pose3
    pose4text.innerText = "Pose 4: " + pose4
    correctImg.classList.remove("selected")
    await delay(1000)
    hider.classList.remove("fading")
    

    }
    else {
    incorrectImg.classList.add("selected")
    console.log("false")
    
    await delay(4000);
    hider.classList.add("fading")

    if (currenQues +1 != questions.length) {
      currenQues += 1
    }
    else {
      finished = true
      hider.classList.remove("fading")
    }
    await delay(2000);
    console.log("waited")
    hasSelected = false
    pose1 = 0 
    pose2 = 0
    pose3 = 0
    pose4 = 0
    pose1text.innerText = "Pose 1: " + pose1
    pose2text.innerText = "Pose 2: " + pose2
    pose3text.innerText = "Pose 3: " + pose3
    pose4text.innerText = "Pose 4: " + pose4
    }
}
  

  // We can call both functions to draw all keypoints and the skeletons
  if (finished == false) {
  drawKeypoints();
  drawSkeleton();
  stroke(0, 255, 0);
  line(0,150, 480,150)
  stroke(0, 0, 255);
  line(0,280, 480,280)
  stroke(255,0,0)
  rect(0,0,80,80)
  rect(400,0,80,80)
  fill(255,255,0)
  stroke(255,255,0)
  rect(0,280, 80,80)
  rect(400,280, 80,80)
  }

  currentQuestion = questions[currenQues]
  quesText.innerText = currentQuestion[0]
  currentAnswers = currentQuestion[1]
  answer1. innerText = currentAnswers[0]
  currentAnswers = currentQuestion[2]
  answer2. innerText = currentAnswers[0]
  currentAnswers = currentQuestion[3]
  answer3. innerText = currentAnswers[0]
  currentAnswers = currentQuestion[4]
  answer4. innerText = currentAnswers[0]

  if (pose1 >= 50 && hasSelected == false) {
    select(1)
    hasSelected = true
  }
  if (pose2 >= 400 && hasSelected == false) {
    select(2)
    hasSelected = true
  }

  if (pose3 >= 400 && hasSelected == false) {
    select(3)
    hasSelected = true
  }

  if (pose4 >= 400 && hasSelected == false) {
    select(4)
    hasSelected = true
  }

}

// A function to draw ellipses over the detected keypoints
function drawKeypoints(){

  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i += 1) {
    // For each pose detected, loop through all the keypoints
    const pose = poses[i].pose;
    
    for (let j = 0; j < pose.keypoints.length; j += 1) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      const keypoint = pose.keypoints[j];
      if (keypoint == pose.keypoints[0])
      {
        if (keypoint.position.y > 280 && keypoint.score > 0.5)
        {
          pose4 += 1
          pose4text.innerText = "Pose 4: " + pose4
        }
        
      }
      if (keypoint == pose.keypoints[13]) {
          if(keypoint.position.y < 150 && keypoint.score > 0.5){
            pose3 += 1
            pose3text.innerText = "Pose 3: " + pose3
          }
      }
      if (keypoint == pose.keypoints[14]) {
        if(keypoint.position.y < 150 && keypoint.score > 0.5){
          pose3 += 1
          pose3text.innerText = "Pose 3: " + pose3
        }
    }
      if (keypoint == pose.keypoints[10]) {
        if (keypoint.position.x < 200 && keypoint.position.y < 100 && keypoint.score >0.3) {
            var keypoint2 = pose.keypoints[9]
            if (keypoint2.position.x >250 && keypoint2.position.y < 100 && keypoint2.score >0.3) {
                pose1 += 1
               
                pose1text.innerText = "Pose 1: " + pose1
            }
            
        }
        if (keypoint.position.x < 200 && keypoint.position.y > 300 && keypoint.score >0.3) {
            keypoint2 = pose.keypoints[9]
            if (keypoint2.position.x > 200 && keypoint2.position.y > 300 && keypoint2.score >0.3) {
                pose2 += 1

                pose2text.innerText = "Pose 2: " + pose2
            }
      }
     

      // Only draw an ellipse is the pose probability is bigger than 0.2
    }
    if (keypoint.score > 0.2) {
      fill(255, 0, 0);
      noStroke();
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
    }
  }
}}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i += 1) {
    const skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j += 1) {
      const partA = skeleton[j][0];
      const partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
  
    }
  }
}


