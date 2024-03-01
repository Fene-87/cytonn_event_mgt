<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LikedEventController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $events = Event::with('likes', 'city')->whereHas('likes', function($q){
            $q->where('user_id', auth()->id());
        })->get();

        return Inertia::render('LikedEvents', [
            'events' => $events,
        ]);
    }
}
