<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendingEventController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $events = Event::with('attendings', 'city')->whereHas('attendings', function($q){
            $q->where('user_id', auth()->id());
        })->get();

        return Inertia::render('AttendingEvents', [
            'events' => $events,
        ]);
    }
}
