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

function draw() {
  image(video, 0, 0, width, height);

  // We can call both functions to draw all keypoints and the skeletons
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