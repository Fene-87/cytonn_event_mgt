<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventIndexController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $events = Event::with('city')->orderBy('created_at', 'desc')->paginate(12);

        return Inertia::render('EventIndex', [
            'events' => $events->items()
        ]);
    }
}
