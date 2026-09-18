<?php

use Illuminate\Support\Facades\Schedule;

Schedule::command('tugas:reminder')->dailyAt('18:30');
