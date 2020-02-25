(($) =>
{
    const SYNTH = new Tone.Synth().toMaster();
    const METRONOME = new Tone.MembraneSynth().toMaster(); 
    const METRONOME_FUNCTION = () => METRONOME.triggerAttackRelease('F2', '16n');

    let BPM = 130;
    let metronome_can_play = false;
    let metronome_tap_timer = 0;
    let metronome_function_interval;


    // Set BPM function
    const setBPM = (bpm) =>
    {
        BPM = bpm;
        Tone.Transport.bpm.value = BPM;
        $('#metronome_bpm_input').val(BPM);
    }

    setBPM(BPM);

    // Play note with Tone.js
    const playNote = (note) =>
    {
        SYNTH.triggerAttackRelease(note, '8n');
    }

    // Play sound on piano interaction
    $('.piano rect').on('click', (e) =>
    {
        playNote(e.target.getAttribute('data-note'));
    });

    // Start or stop the metronome
    $('#metronome_start_btn').on('click', (e) =>
    {
        metronome_can_play = !metronome_can_play;
        $('#metronome_start_btn').toggleClass('btn-outline-primary');
        $('#metronome_start_btn').toggleClass('btn-outline-danger');

        if (metronome_can_play)
        {
            setBPM($('#metronome_bpm_input').val());
            metronome_function_interval = setInterval(METRONOME_FUNCTION, 1000 * 60 / BPM);
            $('#metronome_start_btn').html('STOP');
        }
        else 
        {
            clearInterval(metronome_function_interval);
            $('#metronome_start_btn').html('START');
        }
    });

    // Calculate BPM between tapings
    $('#metronome_tap_btn').on('click', (e) => 
    {
        if (metronome_tap_timer > 0)
        {
            $('#metronome_bpm_input').val(Math.floor(60 / ((Date.now() - metronome_tap_timer) / 1000)));
            metronome_tap_timer = 0;
        }
        else
        {
            metronome_tap_timer = Date.now();
        }
    });

    // Plus and minus buttons for BPM
    $('#metronome_bpm_plus_btn').on('click', () => {
        setBPM(++BPM);
    });
    $('#metronome_bpm_minus_btn').on('click', () => {
        setBPM(--BPM);
    });

})(jQuery);