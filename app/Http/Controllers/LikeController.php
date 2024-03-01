<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke($id)
    {
        $event = Event::findOrFail($id);
        $like = $event->likes()->where('user_id', auth()->id())->first();
        if (!is_null($like)) {
            $like->delete();
            return null;
        } else {
            $like = $event->likes()->create([
                'user_id' => auth()->id()
            ]);
            return $like;
        }
    }
}
