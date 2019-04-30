<template>
    <Page class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Custom Sound Board"></Label>
        </ActionBar>

        <StackLayout>

            <Label v-if="sounds.length === 0" text="You haven't recorded any sounds yet." />

            <ListView for="sound in sounds" @itemTap="playSound" @longPress="deleteSound">
                <v-template>
                    <Label :text="sound.name" />
                </v-template>
            </ListView>
            <Button text="Record New Sounds" @tap="goToRecord" />
        </StackLayout>
    </Page>
</template>

<script>
const audio = require('nativescript-audio');
const fileSystemModule = require('tns-core-modules/file-system');

import soundsAPI from '../api/sounds';
import Record from './Record';

export default {
    data() {
        return {
            audioFolder:null,
            sounds:[]
        }
    },
    created() {
        this.sounds = soundsAPI.getSounds();
		this.audioFolder = fileSystemModule.knownFolders.currentApp().getFolder('recordings');
    },
    methods:{
        async deleteSound(event) {
            let confirmOptions = {
                title: "Delete Sound",
                message: "Do you want to delete this sound?",
                okButtonText: "Yes",
                cancelButtonText: "No"
            };
            confirm(confirmOptions).then(result => {
                if(result) {
                    // first delete the file
                    let file = this.audioFolder.getFile(event.item.fileName);
                    console.log('going to try to delete', file);
                    await file.remove();
                    soundsAPI.removeSound(event.item.fileName);
                }
            });
        },
        goToRecord() {
            this.$navigateTo(Record);
        },
        async playSound(event) {
            console.log('play sound tapped', event.item);
            let player = new audio.TNSPlayer();

            await player.playFromFile({
                audioFile:this.audioFolder.path+'/'+event.item.fileName
            });

        }
    }
};
</script>

<style scoped lang="scss">
    // Start custom common variables
    @import '../app-variables';
    // End custom common variables

    StackLayout {
        padding: 10px;
    }

    Label {
        padding: 20px;
    }
</style>
