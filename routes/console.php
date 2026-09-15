<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('tugas:reminder')->dailyAt('20:00');
