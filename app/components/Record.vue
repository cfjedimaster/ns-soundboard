<template>
	<Page class="page">
		<ActionBar class="action-bar">
			<Label class="action-bar-title" text="Record"></Label>
		</ActionBar>

		<StackLayout>
			<TextField v-model="name" hint="Name for new sound" />
			<GridLayout columns="*,*" height="70">
				<Button text="Record" col="0" @tap="record" v-if="!recording" /> 
				<Button text="Stop Recording" col="0" @tap="endRecord" v-if="recording" /> 
				<!-- Note, I was not able to use null and falsy values -->
				<Button text="Play" col="1" @tap="play" :isEnabled="playEnabled" /> 
			</GridLayout>
			<Button text="Save" @tap="save" :isEnabled="saveEnabled" />
		</StackLayout>
	</Page>

</template>

<script>
const audio = require('nativescript-audio');
const platform = require('tns-core-modules/platform');
const fileSystemModule = require('tns-core-modules/file-system');

import utils from '../api/utils';
import sounds from '../api/sounds';

import Home from './Home';

function randomName() {
	return `rnd${utils.generateUUIDv4()}.mp4`;
}

export default {
	created() {
		this.audioFolder = fileSystemModule.knownFolders.currentApp().getFolder('recordings');
	},
	computed:{
		playEnabled() {
			return this.lastName != '' && !this.recording;
		},
		saveEnabled() {
			return this.playEnabled && this.name !== '';
		}
	},
	data() {
		return {
			name:"",
			audioFolder:null,
			recorder:null,
			recording:false,
			lastName:''
		}
	},
	errorCaptured(err, vm, info) {
		console.log('error in component');
		console.log(err);
	},
	methods: {
        async record() {
	
			// possible clean up
			if(this.lastName) {
				let file = this.audioFolder.getFile(this.lastName);
				console.log('going to try to delete a previous file we didnt save', file);
				await file.remove();
			}

            console.log('doRecord Called 1h');
            this.recorder = new audio.TNSRecorder();

			let newName = randomName();

            /*
            from the sample app
            */
            let androidFormat;
            let androidEncoder;
            if (platform.isAndroid) {
                // static constants are not available, using raw values here
                // androidFormat = android.media.MediaRecorder.OutputFormat.MPEG_4;
                androidFormat = 2;
                // androidEncoder = android.media.MediaRecorder.AudioEncoder.AAC;
                androidEncoder = 3;
            }

			let options = {
				filename:this.audioFolder.path+'/'+newName,
				format:androidFormat,
				encoder:androidEncoder,
				infoCallback:info => {
					//apparently I'm necessary even if blank
				},
				errorCallback:e => {
					console.log('error cb',e);
				}
			};

            await this.recorder.start(options);
			this.recording = true;

			//remember the filename for delete and playback purposes
			this.lastName = newName;

        },
		async endRecord() {
			await this.recorder.stop();
			this.recording = false;
			console.log('finished recording');
		},
		async play() {
			console.log('doPlay called');
            let player = new audio.TNSPlayer();

            await player.playFromFile({
                audioFile:this.audioFolder.path+'/'+this.lastName
            });

        },
		save() {
			sounds.saveSound(this.name, this.lastName);
            this.$navigateTo(Home);
		}

	}
}
</script>

<style>

</style>
