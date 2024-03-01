<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DetailsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        $event = Event::with('country', 'city', 'user')->findOrFail($id);
        $like = $event->likes()->where('user_id', auth()->id())->first();
        $savedEvent = $event->savedEvents()->where('user_id', auth()->id())->first();
        $attending = $event->attendings()->where('user_id', auth()->id())->first();

        return Inertia::render('EventDetails', [
            'event' => $event,
            'like' => $like,
            'attending' => $attending,
            'savedEvent' => $savedEvent
        ]);
    }
}
